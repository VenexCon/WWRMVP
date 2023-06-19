const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  registerBusiness,
  loginBusiness,
  getProfile,
  deleteBusiness,
  logoutBusiness,
  decrementListing,
} = require("../controllers/businessController");

router.post("/", registerBusiness);
router.post("/login", loginBusiness);
router.post("/logout", logoutBusiness);
router.get("/profile", businessProtect, getProfile);
router.put("/profile/decrement-listing", businessProtect, decrementListing);
router.delete("/profile", businessProtect, deleteBusiness);

module.exports = router;
