const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  registerBusiness,
  loginBusiness,
  getProfile,
  deleteBusiness,
} = require("../controllers/businessController");

router.post("/", registerBusiness);
router.post("/login", loginBusiness);
router.get("/profile", businessProtect, getProfile);
router.delete("/profile", businessProtect, deleteBusiness);

module.exports = router;
