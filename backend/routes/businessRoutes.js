const express = require("express");
const router = express.Router();
const {
  registerBusiness,
  loginBusiness,
  getProfile,
} = require("../controllers/businessController");

router.post("/", registerBusiness);
router.post("/login", loginBusiness);
router.get("/profile", getProfile);

module.exports = router;
