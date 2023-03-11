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
    res.statusCode(400);
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
    businessGeolocation: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  if (newBusiness) {
    res.status(201).json({
      _id: newBusiness._id,
      name: newBusiness.businessName,
      address: newBusiness.businessAddress,
      geolocation: newBusiness.businessGeolocation,
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
      geolocation: business.businessGeolocation,
      token: generateToken(business._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  registerBusiness,
  loginBusiness,
};
