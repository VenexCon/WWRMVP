const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register new User
//@route /users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //generate token
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "360d",
    });
  };

  // validate body
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please include all fields");
  }

  if (
    !password.match(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    )
  ) {
    res.status(404);
    throw new Error(
      "Password must contain 8 characters, and one uppercase, lowercase and one special character"
    );
  }

  //find if user already exists
  const userExists = await User.findOne({ email });

  //check for existing user
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password - recommended 10 salts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user in DB
  const user = await User.create({
    name: name.trim(),
    email: email.trim(),
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id, //mongoose assigns a unique id number, if one isn't specified. This grabs that number
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.sendStatus(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login User
//@route /users/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please include all name and detaikls!");
  } else {
    return res.status(200).send("Logged in!");
  }
});

//@desc Return user profile
//@route /users/me
//@access private
const getMe = (req, res) => {
  res.send("Your profile");
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
