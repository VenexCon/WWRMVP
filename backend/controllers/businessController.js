const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
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

//@desc Register new business
//@route /register - shared path with user register, due to component load.
//@access public

const registerBusiness = asyncHandler(async (req, res) => {
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessAddress,
    businessPhone,
    longitude,
    latitude,
    businessTerms,
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
    !latitude ||
    !businessPhone ||
    !businessTerms
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
  const businessExists = await Business.findOne({
    businessEmail: businessEmail,
  });

  if (businessExists) {
    res.status(400);
    throw new Error("Business already exists");
  }

  const userExists = await User.findOne({ email: businessEmail });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered with that E-Mail address");
  }

  // hash password - rec 10 salts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(businessPassword, salt);

  const newBusiness = await Business.create({
    businessName: businessName,
    businessEmail: businessEmail,
    businessPassword: hashedPassword,
    businessAddress: businessAddress,
    businessPhone: businessPhone.replace(/\s/g, ""),
    businessCoordinates: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    businessTerms: businessTerms,
    activeSubscription: false,
    listingAmount: 10,
    SubscriptionType: null,
  });

  if (newBusiness) {
    const cToken = generateToken(newBusiness._id);
    res
      .status(201)
      .cookie("token", cToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: expiryDate,
      })
      .json({
        _id: newBusiness._id,
        name: newBusiness.businessName,
        address: newBusiness.businessAddress,
        phone: newBusiness.businessPhone,
        email: newBusiness.businessEmail,
        businessCoordinates: newBusiness.businessGeolocation,
        activeSubscription: newBusiness.activeSubscription,
        listingAmount: newBusiness.listingAmount,
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

  const business = await Business.findOne({ businessEmail: email });

  //check if passwords match
  if (business && (await bcrypt.compare(password, business.businessPassword))) {
    const cToken = generateToken(business._id);
    res
      .status(200)
      .cookie("token", cToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: expiryDate,
      })
      .json({
        _id: business._id,
        name: business.businessName,
        email: business.businessEmail,
        address: business.businessAddress,
        phone: business.businessPhone,
        businessCoordinates: business.businessCoordinates,
        activeSubscription: business.activeSubscription,
        listingAmount: business.listingAmount,
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
    phone: req.business.businessPhone,
    address: req.business.businessAddress,
    businessCoordinates: req.business.businessCoordinates,
  };
  res.status(200).json(business);
};

//@Desc Replace the cookie with null on logout, to ensure all tokens are moved
//@Route /users/logout
//@access private

const logoutBusiness = asyncHandler(async (req, res) => {
  res
    .status(202)
    .clearCookie("token", null, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      expires: expiryDate,
    })
    .json({ message: "Business Logged out" });
});

//@desc Delete Business Profile
//@route /business/profile
//@access Private
const deleteBusiness = asyncHandler(async (req, res) => {
  const { _id } = req.business;
  //add in functions to delete the listings associated with the business ID
  try {
    const deletionPromises = [
      Business.deleteOne({ _id: _id }),
      Listing.deleteMany({ business: _id }),
    ];

    const promises = await Promise.all(deletionPromises);

    if (promises) {
      res
        .status(202)
        .clearCookie("token", null, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          expires: expiryDate,
        })
        .json({
          message: "Business Account Deleted",
        });
    } else {
      throw new Error("Unable to delete Account or Listings");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Unable to delete business");
  }
});

module.exports = {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
  getProfile,
  deleteBusiness,
};
