const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Business = require("../models/businessModel");
const Listing = require("../models/listingModel");
const jwt = require("jsonwebtoken");

//@desc create a new listing
//@route /listing/new
//@access private
const createTicket = asyncHandler(async (req, res) => {
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

module.exports = { createTicket };
