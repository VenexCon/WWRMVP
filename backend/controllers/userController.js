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

//set token cookie to 10 years
function getDate10YearsFromNow() {
  const tenYearsFromNow = new Date();
  tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
  return tenYearsFromNow;
}

const expiryDate = getDate10YearsFromNow();

//validation functions
const checkIfUserOrBusinessExists = async (email) => {
  const userExists = await User.findOne({ email: email });
  const businessExists = await Business.findOne({ businessEmail: email });

  if (userExists || businessExists) {
    return true;
  }

  return false;
};

//@desc Register new User
//@route /api/users
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
  const exists = await checkIfUserOrBusinessExists(email);

  if (exists) {
    res.status(400);
    throw new Error("User or business already exists");
  }

  //Hash password - recommended 10 salts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user in DB
  const user = await User.create({
    name: name,
    email: email.toLowerCase(),
    password: hashedPassword,
    agreedTerms: terms,
  });

  if (user) {
    const cToken = generateToken(user._id);
    res
      .status(201)
      .cookie("token", cToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: expiryDate,
      })
      .json({
        _id: user._id, //mongoose assigns a unique id number, if one isn't specified. This grabs that number
        name: user.name,
        email: user.email,
        terms: user.agreedTerms,
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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //check if passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      const cToken = generateToken(user._id);

      res
        .status(200)
        .cookie("token", cToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          expires: expiryDate,
        })
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//@Desc Replace the cookie with null on logout, to ensure all tokens are moved
//@Route /users/logout
//@access private

const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("token", null, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      expires: expiryDate,
    })
    .json({ message: "User Logged out" });
});

//@desc Return user profile
//@route /api/users/profile
//@access private
const getMe = asyncHandler(async (req, res) => {
  const { id, email, name } = req.user;
  const user = await User.findOne({ email: email }).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Delete User Profile
//@route /api/users/profile
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

//@desc Update User Profile
//@route /api/users/profile
//@access Private

const editUser = asyncHandler(async (req, res) => {
  const { email, name, userId } = req.body;
  // Validate user ID
  if (userId.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("You are not allowed to edit this user");
  }

  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // Validate name format
  if (name.trim().length === 0) {
    res.status(400);
    throw new Error("Name cannot be empty");
  }

  //find if the business/user already exists
  const businessExists = await Business.findOne({ businessEmail: email });
  if (businessExists) {
    res
      .status(400)
      .json({ message: "Email already in use by another account" });
  }

  try {
    //check that the user exists...again
    const originalUser = await User.findById(userId);

    if (!originalUser) {
      res.status(400);
      throw new Error("No user found");
    }

    originalUser.name = name.trim();
    originalUser.email = email;

    const savedUser = await originalUser.save();
    const cToken = generateToken(savedUser._id);

    const response = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };
    res
      .status(200)
      .cookie("token", cToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: expiryDate,
      })
      .json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  deleteMe,
  editUser,
  logoutUser,
  checkIfUserOrBusinessExists,
};
