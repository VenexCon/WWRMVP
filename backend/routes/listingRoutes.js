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
} = require("../controllers/listingController");

router.get("/", getAllListings);
router.post("/new", businessProtect, createListing);
router.get("/myListings", businessProtect, getMyListings);
router.route("/:id").get(getSpecificListing).post(businessProtect, editListing);

module.exports = router;
