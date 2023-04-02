const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  createListing,
  getListings,
  getAllListings,
} = require("../controllers/listingController");

router.get("/", getAllListings);
router.post("/new", businessProtect, createListing);
router.get("/myListings", businessProtect, getListings);

module.exports = router;
