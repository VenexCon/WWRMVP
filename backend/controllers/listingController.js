const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const Listing = require("../models/listingModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//@desc create a new listing
//@route /listing/new
//@access private
const createListing = asyncHandler(async (req, res) => {
  try {
    const { businessCoordinates, id, businessAddress, businessEmail } =
      req.business;
    const {
      title,
      description,
      phoneNumber,
      address,
      useBusAddress,
      latitude,
      longitude,
    } = req.body;

    if (!title || !description || !phoneNumber) {
      res.status(404);
      throw new Error("Please ensure all fields are completed.");
    }
    if (useBusAddress) {
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
    } else {
      const newListing = await Listing.create({
        listingTitle: title,
        listingDescription: description,
        listingLocation: address,
        listingCoordinates: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        listingEmail: businessEmail,
        listingPhone: phoneNumber,
        business: id,
      });
      res.status(201).json(newListing);
    }
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
// @desc    Get specific Listing
// @route   GET /api/listing/:id
// @access  Private
const getSpecificListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  res.status(200).json(listing);
});

// @desc    Edit a Specific Listing
// @route   post /api/editListing/:id
// @access  Private
const editListing = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    phoneNumber,
    address,
    latitude,
    longitude,
    business,
  } = req.body;
  const { _id } = req.business;

  if (_id.toString() !== business) {
    res.status(400);
    throw new Error("You are not allowed to edit this listing");
  }

  const { listingId } = req.params;
  const updatedListing = await Listing.findOneAndUpdate(
    { _id: listingId },
    {
      listingTitle: title,
      listingDescription: description,
      listingLocation: address,
      listingCoordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      listingPhone: phoneNumber,
    },
    { new: true }
  );

  if (!updatedListing) {
    res.status(404);
    throw new Error("Listing could not be updated, please try later");
  }

  console.log(updatedListing);

  res.status(200).json(updatedListing);
});

module.exports = {
  createListing,
  getMyListings,
  getAllListings,
  getSpecificListing,
  editListing,
};
