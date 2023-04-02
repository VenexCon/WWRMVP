const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");

//generate jwt token
//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "360d",
  });
};

//@desc Register new User
//@route /users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, terms } = req.body;

  if (name.includes(" ") || email.includes(" ") || password.includes(" ")) {
    res.status(404);
    throw new Error("Name, Email and Password cannot contain empty spaces");
  }

  // validate body
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please include all fields");
  }
  //password must match regex
  if (
    !password.match(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    )
  ) {
    res.status(404);
    throw new Error(
      "Password must contain 8 characters, one uppercase, lowercase and one special character"
    );
  }

  //find if user already exists
  const userExists = await User.findOne({ email: email });

  //check for existing user
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //check to see if a business is already registered with that email address
  const businessExists = await Business.findOne({ businessEmail });

  if (businessExists.length > 1) {
    res.status(400);
    throw new Error("Business account already exists with that E-Mail");
  }

  //Hash password - recommended 10 salts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user in DB
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    agreedTerms: terms,
  });

  if (user) {
    res.status(201).json({
      _id: user._id, //mongoose assigns a unique id number, if one isn't specified. This grabs that number
      name: user.name,
      email: user.email,
      terms: user.agreedTerms,
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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check if passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//@desc Return user profile
//@route /users/me
//@access private
const getMe = (req, res) => {
  const user = {
    id: req.user._id, // because of the mongoose schema storing id as ._id
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
};

//@desc Delete User Profile
//@route /users/me
//@access Private
const deleteMe = asyncHandler(async (req, res) => {
  try {
    const deleted = await User.deleteOne({ id: req.user._id });
    res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Unable to delete user");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  deleteMe,
};
