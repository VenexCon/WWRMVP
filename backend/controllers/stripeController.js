const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");

const searchByToken = asyncHandler(async (token) => {});
const lineItems = [
  {
    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    price: "price_1NEdzYKSsp4mks69QRMKYJQ4",
    quantity: 1,
  },
];

const session = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/stripe/payment";
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
    },
  });
  /* res.redirect(303, session.url) */
  res.json({ url: session.url });
});

//checkout gateway customer portal here
//Need to replace this with dynamic values from the req.business.
const createSessionPortal = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/profile";
  const customerNo = req.business.customerNo;
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerNo,
    return_url: returnUrl,
  });

  /* res.redirect(303, portalSession.url); */
  res.json({ url: portalSession.url });
});

//Update Business
const updateBusiness = asyncHandler(
  async (customerId, id, checkoutSessionId, returnedListings) => {
    try {
      // Find and update the business by its _id
      const business = await Business.findByIdAndUpdate(
        { _id: id }, // Use the email as the _id to match the metadata
        {
          customerNo: customerId,
          activeSubscription: true,
          checkoutSessionId: checkoutSessionId,
          listingAmount: returnedListings,
        },
        { new: true } // To return the updated document
      ).select("-password");
      //change to return and throw errorss
      if (business) {
        console.log("Business updated:", business);
      } else {
        console.log("Business not found");
      }
    } catch (error) {
      console.log("Error updating business:", error);
    }
  }
);

//Refresh listing amounts when subscription is updated and paid.
//updateCustomer - event = invoice.paid
const updateCustomer = asyncHandler(async (customerId, planType) => {
  const business = await Business.findOne({ customerNo: customerId });
  if (!business) return Error("No business found");

  if (planType === "pro") {
    business.listingAmount = 50;
    return business.save();
  }

  if (planType === "enterprise") {
    business.listingAmount = 20000;
    return business.save();
  }
});

//Update customer metadata with business model ID for retrieval later, and to recognize subscriptions.
const addMetadataToCustomer = asyncHandler(async (customerId, businessId) => {
  await stripe.customers.update(customerId, {
    metadata: {
      businessId: businessId,
    },
  });
});

//sets businesses plan type to "basic", therefore the CRON will attach 10 basic listings and the customer will no
//longer have an enterprise or pro plan.
// Give some thought to how the user will re-subscribe, it should be the same customer number,

//Look into webhooks for monitoring subscriptions.
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
      //Blocked to test other events.
      const checkoutSession = event.data.object;
      const customerId = checkoutSession.customer;
      const id = checkoutSession.metadata.businessId;
      const checkoutSessionId = checkoutSession.id;
      const returnedListings = 10;
      addMetadataToCustomer(customerId, id);
      updateBusiness(customerId, id, checkoutSessionId, returnedListings);
      break;
    case "customer.subscription.trial_will_end":
      subscription = event.data.object;
      status = subscription.status;
      //free tier means no free trial for more listings.
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      //console.log("sUBSCRIPTION CANCELLED");
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      //console.log(subscription.customer);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      //Get business,
      //get type of subscription from metadata.
      //renew based on enterprise or pro pla e.g. 50 or unlimited.
      break;
    case "invoice.paid":
      invoiceObject = event.data.object;
      customerId = invoiceObject.customer;
      planType = invoiceObject.metadata.planType;
      updateCustomer(customerId, planType);
      break;
    default:
    // Unexpected event type
    //console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = { webhook, session, createSessionPortal };
