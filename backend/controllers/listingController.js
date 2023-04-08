const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const Listing = require("../models/listingModel");
const jwt = require("jsonwebtoken");

//@desc create a new listing
//@route /listing/new
//@access private
const createListing = asyncHandler(async (req, res) => {
  try {
    const { businessCoordinates, id, businessAddress, businessEmail } =
      req.business;
    const { title, description, phoneNumber, address } = req.body;
    console.log(req.body);

    if (!title || !description) {
      res.status(404);
      throw new Error("Please ensure all fields are completed.");
    }

    // currently the location is === to the same as the businesses who creates the listing
    //This needs to change to geo-locate the listing from the address put in for the listing.
    const newListing = await Listing.create({
      listingTitle: title,
      listingDescription: description,
      listingLocation: businessAddress,
      listingCoordinates: businessCoordinates,
      listingEmail: businessEmail,
      listingPhone: phoneNumber,
      business: id,
    });

    res.status(201).json(newListing);
  } catch (error) {
    res.status(500);
    throw new Error(`Error creating listing: ${error.message}`);
  }
});

// @desc    Get business listings
// @route   GET /listing/mylistings
// @access  Private
const getMyListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ business: req.business._id });
  if (listings.length === 0) {
    return res.status(200).json(listings);
  }
  console.log(req.body);
  res.status(200).json(listings);
});

//@desc get 10 listings
//route @ GET listings
//@access Public
const getAllListings = asyncHandler(async (req, res) => {
  try {
    const listings = await Listing.find({}).limit(10).exec();
    res.status(200).json(listings);
  } catch (error) {
    res.status(404);
    throw new Error("No listings found");
  }
});

/* Change to get a specific listing!  */
// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getSpecificListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  res.status(200).json(listing);
});

module.exports = {
  createListing,
  getMyListings,
  getAllListings,
  getSpecificListing,
};
