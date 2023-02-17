const asyncHandler = require("express-async-handler");

//@desc Register new User
//@route /users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please include all fields");
  } else {
    return res.status(201).send("user Registered");
  }
});

//@desc Login User
//@route //users/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  if(!email || !password) {
  throw new Error('Please include all name and detaikls!')
  } else {
    return res.status(200).send('Logged in!')
  }
});

//@desc Register new User
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
