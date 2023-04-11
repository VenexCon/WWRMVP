const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createListing,
  getMyListings,
  getAllListings,
  getSpecificListing,
  editListing,
  searchListings,
} = require("../controllers/listingController");

router.get("/", getAllListings);
router.post("/new", businessProtect, createListing);
router.get("/myListings", businessProtect, getMyListings);
router.route("/:id").get(getSpecificListing).post(businessProtect, editListing);
router.post("/:listingId/edit", businessProtect, editListing);
router.get("/search", searchListings);

module.exports = router;
