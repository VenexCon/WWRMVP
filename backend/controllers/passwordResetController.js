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
//change to return the actual account details minus the password
const checkIfUserOrBusinessExists = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return { type: "user", account: user };
  }

  const business = await Business.findOne({ businessEmail: email });
  if (business) {
    return { type: "business", account: business };
  }

  return false;
};

const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  //Check the accounts exists and return false if not true.
  const account = await checkIfUserOrBusinessExists(email);
  if (account === false) {
    return res.status(404).json({ message: "Account not found" });
  }
  //generate a token to be used
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "20m",
  });

  //Attach token to model & send token, do not call gen token here as it will result in two different tokens.
  if (account.type === "user") {
    account.account.resetToken = token;
    account.account.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await account.account.save();
  } else {
    account.account.businessResetToken = token;
    account.account.businessResetTokenExpiration = Date.now() + 3600000; // 1 hour
    await account.account.save();
  }

  //msg
  const msg = {
    to: email,
    from: "admin@whowantsrubbish.com",
    subject: "Password Reset Request",
    text:
      "We received a request to reset your password. Please click the following link to reset your password: http://localhost:3000/reset-password/" +
      token,
    html: `<p>We received a request to reset your password. Please click the following link to reset your password: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a></p>`,
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
