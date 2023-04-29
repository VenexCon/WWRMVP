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
    const {
      businessCoordinates,
      id,
      businessAddress,
      businessEmail,
      businessPhone,
    } = req.business;
    const {
      title,
      description,
      phoneNumber,
      address,
      useBusAddress,
      useBusPhone,
      latitude,
      longitude,
    } = req.body;

    if (!title || !description) {
      res.status(404);
      throw new Error("Please ensure all fields are completed.");
    }

    let listingLocation = address;
    let listingCoordinates = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    let listingPhone = phoneNumber;

    if (useBusAddress) {
      listingLocation = businessAddress;
      listingCoordinates = businessCoordinates;
    }

    if (useBusPhone) {
      listingPhone = businessPhone;
    }

    const newListing = await Listing.create({
      listingTitle: title,
      listingDescription: description,
      listingLocation: listingLocation,
      listingCoordinates: listingCoordinates,
      listingEmail: businessEmail,
      listingPhone: listingPhone,
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

  const { id } = req.params;

  const updatedListing = await Listing.findById(id);

  if (!updatedListing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  updatedListing.listingTitle = title;
  updatedListing.listingDescription = description;
  updatedListing.listingLocation = address;
  updatedListing.listingCoordinates = {
    type: "Point",
    coordinates: [longitude, latitude],
  };
  updatedListing.listingPhone = phoneNumber;

  const savedListing = await updatedListing.save();

  res.status(200).json(savedListing);
});

// @desc    Filter Listings by user input
// @route   Get /api/listing/search,{params here}
// @access  Public

const searchListings = asyncHandler(async (req, res) => {
  const { latitude, longitude, distance, query } = req.query;
  const maxDistanceMeters = distance * 1000; // distance in km

  let listings;

  if (!latitude && !longitude && query) {
    // search listings by keyword
    listings = await searchListingsByKeyword(query);
  } else if (latitude && longitude && !query) {
    // search listings by location
    listings = await searchListingsByLocation(
      latitude,
      longitude,
      maxDistanceMeters
    );
  } else if (latitude && longitude && query) {
    // search listings by location and keyword
    listings = await searchListingsByLocationAndKeyword(
      latitude,
      longitude,
      maxDistanceMeters,
      query
    );
  } else {
    // handle invalid or missing parameters
    return res.status(400).json({ error: "Invalid or missing parameters" });
  }

  res.status(200).json(listings);
});

const searchListingsByKeyword = async (query) => {
  try {
    const listings = await Listing.find({
      listingTitle: { $regex: new RegExp(query, "i") },
    });
    return listings;
  } catch (error) {
    console.log(error);
    throw new Error("Error searching listings");
  }
};

const searchListingsByLocation = async (
  latitude,
  longitude,
  maxDistanceMeters
) => {
  try {
    const listings = await Listing.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: maxDistanceMeters,
          spherical: true,
        },
      },
    ]);
    return listings;
  } catch (error) {
    console.log(error);
    throw new Error("Error searching listings");
  }
};

const searchListingsByLocationAndKeyword = async (
  latitude,
  longitude,
  maxDistanceMeters,
  query
) => {
  try {
    const listings = await Listing.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: maxDistanceMeters,
          spherical: true,
        },
      },
      {
        $match: {
          listingTitle: { $regex: new RegExp(query, "i") },
        },
      },
    ]);
    return listings;
  } catch (error) {
    console.log(error);
    throw new Error("Error searching listings");
  }
};

// @desc    Delete Listing
// @route   delete /api/listing/:id
// @access  Private
const deleteListing = async (req, res) => {
  const { id, business } = req.params;
  const { _id } = req.business;

  if (_id.toString() !== business) {
    res.status(400);
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing could not be deleted" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createListing,
  getMyListings,
  getAllListings,
  getSpecificListing,
  editListing,
  searchListings,
  deleteListing,
};
