const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");

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
    SubscriptionType: "basic",
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
        businessName: newBusiness.businessName,
        businessAddress: newBusiness.businessAddress,
        businessPhone: newBusiness.businessPhone,
        businessEmail: newBusiness.businessEmail,
        businessCoordinates: newBusiness.businessGeolocation,
        activeSubscription: newBusiness.activeSubscription,
        listingAmount: newBusiness.listingAmount,
        subscriptionType: newBusiness.SubscriptionType,
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
        businessName: business.businessName,
        businessEmail: business.businessEmail,
        businessAddress: business.businessAddress,
        businessPhone: business.businessPhone,
        businessCoordinates: business.businessCoordinates,
        activeSubscription: business.activeSubscription,
        listingAmount: business.listingAmount,
        subscriptionType: business.SubscriptionType,
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
    _id: req.business._id, // because of the mongoose schema storing id as ._id
    businessEmail: req.business.businessEmail,
    businessName: req.business.businessName,
    businessPhone: req.business.businessPhone,
    businessAddress: req.business.businessAddress,
    businessCoordinates: req.business.businessCoordinates,
    listingAmount: req.business.listingAmount,
    subscriptionType: req.business.SubscriptionType,
    activeSubscription: req.business.activeSubscription,
  };
  res.status(200).json(business);
};
//@Desc minus one from listings when listings are created.
const decrementListing = asyncHandler(async (req, res) => {
  if (req.business.listingAmount <= 0) {
    res.status(404);
    throw new Error("No listings remaining");
  }
  try {
    const updated = await Business.findByIdAndUpdate(
      req.business._id,
      {
        listingAmount: req.business.listingAmount - 1,
      },
      { new: true }
    ).select("-businessPassword");

    if (updated) {
      res.status(201).json(updated);
    }
  } catch (error) {
    res.status(400);
    throw new Error("Could not update listing Amount");
  }
});
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

//NODE CRON
//Schedule cron job to run on the first day of every month at 00:00 (midnight)
//This adds 10 listings to each business without an active subscription.
cron.schedule(
  "0 0 1 * *",
  asyncHandler(async () => {
    try {
      // Fetch all business units
      const businessUnits = await Business.find();

      // Iterate over each business unit
      businessUnits.forEach(async (businessUnit) => {
        // Check if the business unit does not have a paid plan
        if (!businessUnit.activeSubscription) {
          // Add 10 to the listingsAmount
          businessUnit.listingsAmount += 10;

          // Save the updated business unit
          await businessUnit.save();
        }
      });

      console.log("Cron job executed successfully.");
    } catch (error) {
      res.status(500);
      console.error("Error executing cron job:", error);
    }
  })
);

module.exports = {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
  getProfile,
  deleteBusiness,
  decrementListing,
};
