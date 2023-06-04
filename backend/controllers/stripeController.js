const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");

const searchByToken = asyncHandler(async (token) => {});

const session = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/stripe/payment";
  //Create checkout session for user.
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NEdzYKSsp4mks69QRMKYJQ4",
        quantity: 1,
      },
      {
        price: "price_1NEe4PKSsp4mks69CTTtSlIG",
        quantity: 1,
      },
      {
        price: "price_1NEe6RKSsp4mks69DMPSVWgh",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}?success=true?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    //This will be used to update the subscription in the webhook func below.
    customer_email: "connorjobs@hotmail.com",
  });
  res.redirect(303, session.url);
});

//checkout gateway customer portal here
const createSessionPortal = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/listing/search";
  const session_id =
    "cs_test_a116RZaN8jtWnI7A4pxqpsgLoo6HPoQu9VSMvwjdbvdEdATZ5tNlMM8olP";
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

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
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      const checkoutSession = event.id;
      console.log(checkoutSession);
      break;
    case "customer.subscription.trial_will_end":
      subscription = event.data.object;
      status = subscription.status;
      //console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding(subscription);
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      //console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription deleted.
      // handleSubscriptionDeleted(subscriptionDeleted);
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      //console.log(event.data);
      //console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription created.
      // handleSubscriptionCreated(subscription);
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      //console.log(`Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      break;
    default:
    // Unexpected event type
    //console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = { webhook, session, createSessionPortal };
