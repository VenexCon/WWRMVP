const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const jwt = require("jsonwebtoken");

//generate jwt token
//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "360d",
  });
};

//@desc Register new business
//@route /business
//@access public

const registerBusiness = asyncHandler(async (req, res) => {
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessAddress,
    longitude,
    latitude,
  } = req.body;

  if (businessEmail.includes(" ") || businessPassword.includes(" ")) {
    res.status(404);
    throw new Error("Password or Email cannot contain empty spaces");
  }

  if (
    !businessEmail ||
    !businessPassword ||
    !businessAddress ||
    !businessName ||
    !longitude ||
    !latitude
  ) {
    res.status(404);
    throw new Error("All fields must be completed");
  }

  //password must match regex
  if (
    !businessPassword.match(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    )
  ) {
    res.status(404);
    throw new Error(
      "Password must contain 8 characters, one uppercase, lowercase and one special character"
    );
  }

  //find if the business already exists
  const businessExists = await Business.findOne({ businessEmail });

  if (businessExists) {
    res.status(400);
    throw new Error("Business already exists");
  }

  // hash password - rec 10 salts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(businessPassword, salt);

  const newBusiness = await Business.create({
    businessName: businessName,
    businessEmail: businessEmail,
    businessPassword: hashedPassword,
    businessAddress: businessAddress,
    businessCoordinates: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  if (newBusiness) {
    res.status(201).json({
      _id: newBusiness._id,
      name: newBusiness.businessName,
      address: newBusiness.businessAddress,
      businessCoordinates: newBusiness.businessGeolocation,
      token: generateToken(newBusiness._id),
    });
  } else {
    throw new Error("Invalid business data");
  }
});

//@desc login business account
//@route /business/login
//@access public

const loginBusiness = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const business = await Business.findOne({ email });

  //check if passwords match
  if (business && (await bcrypt.compare(password, business.businessPassword))) {
    res.status(200).json({
      _id: business._id,
      name: business.businessName,
      email: business.businessEmail,
      address: business.businessAddress,
      businessCoordinates: business.businessCoordinates,
      token: generateToken(business._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc Return business profile
//@route /business/profile
//@access private
const getProfile = (req, res) => {
  const business = {
    id: req.business._id, // because of the mongoose schema storing id as ._id
    email: req.business.businessEmail,
    name: req.business.businessName,
    address: req.business.businessAddress,
    businessCoordinates: req.business.businessCoordinates,
  };
  res.status(200).json(business);
};

//@desc Delete User Profile
//@route /users/me
//@access Private
const deleteBusiness = asyncHandler(async (req, res) => {
  try {
    const deleted = await Business.deleteOne({ id: req.business._id });
    res.status(200).json({
      message: "Business Account Deleted",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Unable to delete business");
  }
});

module.exports = {
  registerBusiness,
  loginBusiness,
  getProfile,
  deleteBusiness,
};
