const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const session = asyncHandler(async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000/listing/search";
  //Create checkout session for user.
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NEdzYKSsp4mks69QRMKYJQ4",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = { session };
