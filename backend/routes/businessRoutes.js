const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  registerBusiness,
  loginBusiness,
  deleteBusiness,
  logoutBusiness,
  decrementListing,
} = require("../controllers/businessController");

router.post("/", registerBusiness);
router.post("/login", loginBusiness);
router.post("/logout", logoutBusiness);

router.delete("/profile", businessProtect, deleteBusiness);
router.put("/profile/decrementlisting", businessProtect, decrementListing);

module.exports = router;
