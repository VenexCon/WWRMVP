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

//@desc Checks email to see if an account exists and then attaches a token and expiry time.
//@route /api/resetPassword
//@access public
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
      `We received a request to reset your password. Please click the following link to reset your password: http://localhost:3000/passwordReset/passwordUpdate/${token}` +
      token,
    html: `<p>We received a request to reset your password. Please click the following link to reset your password: <a href="http://localhost:3000/passwordReset/passwordUpdate/${token}">Reset Password</a></p>`,
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

//@desc finds user by token
//@route /api/passwordUpdate/:token
//@access private
const updateTokenAccount = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const { password } = req.body;
  const user = await User.findOne({ resetToken: token });
  const business = await Business.findOne({ businessResetToken: token });
  console.log(user);
  console.log(business);
  //checks if an account exists
  if (!user && !business) {
    res.status(404);
    throw new Error("Account not found");
  }
  //checks to see if the expiry time of 10 minutes is up
  const expiryTime = user
    ? user.resetTokenExpiration
    : business.businessResetTokenExpiration;
  if (new Date() > new Date(expiryTime)) {
    res.status(401);
    throw new Error("Reset token has expired");
  }
  //validate password, same as registering an account
  if (
    !password.match(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    )
  ) {
    res.status(404);
    console.log("password no good");
    throw new Error(
      "Password must contain 8 characters, one uppercase, lowercase and one special character"
    );
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //save the doc
  if (user !== null) {
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } else {
    business.businessPassword = hashedPassword;
    business.businessResetToken = undefined;
    business.businessResetTokenExpiry = undefined;
    await business.save();
    return res.status(200).json({ message: "Password updated successfully" });
  }
});

module.exports = { resetPassword, updateTokenAccount };
