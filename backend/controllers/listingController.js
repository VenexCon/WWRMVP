const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const Listing = require("../models/listingModel");
const jwt = require("jsonwebtoken");

//@desc create a new listing
//@route /listing/new
//@access private
const createListing = asyncHandler(async (req, res) => {
  const { businessCoordinates, id, businessAddress } = req.business;
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(404);
    throw new Error("Please ensure all fields are completed.");
  }

  const newListing = await Listing.create({
    listingTitle: title,
    listingDescription: description,
    listingLocation: businessAddress,
    listingCoordinates: businessCoordinates,
    business: id,
  });

  res.status(201).json(newListing);
});

// @desc    Get business listings
// @route   GET /listing/mylistings
// @access  Private
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ business: req.business._id });
  if (listings.length === 0) {
    return;
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
// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

module.exports = { createListing, getListings, getAllListings };
