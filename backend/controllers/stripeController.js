const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");

const lineItems = [
  {
    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    price: "price_1NEe6RKSsp4mks69DMPSVWgh",
    quantity: 1,
  },
];

//@Access - Private
//@Desc - initalises a checkout session, needs to be dynamic for the line items.
//@Route '/create-checkout-session'
const session = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/stripe/payment";

  //get the plan type from another source - Needs to be dynamic.
  const planType = "enterprise";

  //Create checkout session for user.
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}?success=true?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    //This will be used to update the subscription in the webhook func below.
    customer_email: req.business.businessEmail,
    metadata: {
      businessId: `${req.business._id}`,
      planType: planType,
    },
  });
  res.json({ url: session.url });
});

//@DESC - checkout gateway customer portal for subscription management, takes customer ID as attached during checkout session completion.
//@Access - Private
//@Route /create-portal-session
const createSessionPortal = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/profile";
  const customerNo = req.business.customerNo;
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerNo,
    return_url: returnUrl,
  });
  res.json({ url: portalSession.url });
});

//@Switch Case : Checkout.completed
//Update Business called during the checkout.completed case.
//handles adding the customerID to the business model.
const updateBusiness = asyncHandler(
  async (customerId, id, checkoutSessionId, planType) => {
    try {
      // Find and update the business by its _id
      const business = await Business.findByIdAndUpdate(
        { _id: id }, // Use the email as the _id to match the metadata
        {
          customerNo: customerId,
          activeSubscription: true,
          checkoutSessionId: checkoutSessionId,
          subscriptionType: planType,
        },
        { new: true } // To return the updated document
      ).select("-password");
      if (business) {
        return business.save();
      } else {
        console.log("Business not found");
        throw new Error("Business does not exist");
      }
    } catch (error) {
      res.status(404);
      console.log("Error updating business:", error);
      throw new Error(error.message);
    }
  }
);

//@Switch Case : Invoice.Paid
//refresh listings is called during the invoice .paid
//This should check what type of subscription the business has and then
const refreshListings = asyncHandler(async (customerId) => {
  try {
    const business = await Business.findOne({ customerNo: customerId });
    if (!business) return Error("No business found");

    if (business.subscriptionType === "pro") {
      business.listingAmount = 50;
      return business.save();
    }

    if (business.subscriptionType === "enterprise") {
      business.listingAmount = 20000;
      return business.save();
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//@Switch Case - Checkout.session.completed
//Update customer metadata with business model ID for retrieval later, and to recognize subscriptions.
const addMetadataToCustomer = asyncHandler(async (customerId, businessId) => {
  try {
    await stripe.customers.update(customerId, {
      metadata: {
        businessId: businessId,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//@Switch Case - Subscription.cancelled.
//sets businesses plan type to "basic",
//sets listings back to ten (10).
const subscriptionCancelled = asyncHandler(async (customerId) => {
  try {
    const business = await Business.findOneAndUpdate(
      { customerNo: customerId },
      {
        activeSubscription: false,
        checkoutSessionId: "",
        subscriptionType: "basic",
        listingAmount: 10,
      },
      { new: true }
    );
    console.log(business);
    if (business) return business.save();

    if (!business) {
      throw new Error("No business found!");
    }
    return business;
  } catch (error) {
    console.log(error);
  }
});

//Look into webhooks for monitoring subscriptions.
//Seperate routing in server.js for this webhook.
//@TO-DO- Handle failed payments when invoiced,
const webhook = asyncHandler(async (req, res) => {
  let event = req.body;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  // Get the signature sent by Stripe

  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      const customerId = checkoutSession.customer;
      const id = checkoutSession.metadata.businessId;
      const planType = checkoutSession.metadata.planType;
      const checkoutSessionId = checkoutSession.id;
      addMetadataToCustomer(customerId, id);
      updateBusiness(customerId, id, checkoutSessionId, planType);
      break;
    case "customer.subscription.trial_will_end":
      subscription = event.data.object;
      status = subscription.status;
      //free tier means no free trial for more listings.
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log("Subscription :", subscription);
      subscriptionCancelled(subscription.customer);
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log(subscription);
      break;
    case "invoice.paid":
      //No idea if this works
      invoiceObject = event.data.object;
      refreshListings(invoiceObject.customer);
      /*  customerId = invoiceObject.customer;
      refreshListings(customerId); */
      break;
    default:
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = { webhook, session, createSessionPortal };
