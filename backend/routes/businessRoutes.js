const express = require("express");
const router = express.Router();
const {
  registerBusiness,
  loginBusiness,
} = require("../controllers/businessController");

router.post("/", registerBusiness);

router.post("/login", loginBusiness);

router.get("/profile", (req, res) => {
  res.status(200);
  res.send("Your business profile");
});

module.exports = router;
