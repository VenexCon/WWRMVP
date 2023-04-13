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
  deleteListing,
} = require("../controllers/listingController");

router.get("/", getAllListings);
router.post("/new", businessProtect, createListing);
router.get("/myListings", businessProtect, getMyListings);
router.get("/search", searchListings);
router
  .route("/:id")
  .get(getSpecificListing)
  .put(businessProtect, editListing)
  .delete(businessProtect, editListing);
//router.post("/:listingId/edit", businessProtect, editListing);

module.exports = router;
