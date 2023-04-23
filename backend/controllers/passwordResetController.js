const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");

// Set up SendGrid API key
sgMail.setApiKey(process.env.FORGOT_PASSWORD_KEY);

//Check if user or business exists first.

const checkIfUserOrBusinessExists = async (email) => {
  const userExists = await User.findOne({ email: email });
  const businessExists = await Business.findOne({ businessEmail: email });

  if (userExists || businessExists) {
    return true;
  }
  return false;
};

const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const checkAccount = await checkIfUserOrBusinessExists(email);
  if (!checkAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  const msg = {
    to: email,
    from: "admin@whowantsrubbish.com",
    subject: "Password Reset Request",
    text: "We received a request to reset your password. Please ignore this email if you did not make this request.",
    html: "<p>We received a request to reset your password. Please ignore this email if you did not make this request.</p>",
    reply_to: "admin@whowantsrubbish.com",
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email not sent" });
  }
});

module.exports = { resetPassword };
