const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createListing,
  getMyListings,
  getAllListings,
  getSpecificListing,
} = require("../controllers/listingController");

router.get(":id", protect, getSpecificListing);
router.get("/", getAllListings);
router.post("/new", businessProtect, createListing);
router.get("/myListings", businessProtect, getMyListings);

module.exports = router;
