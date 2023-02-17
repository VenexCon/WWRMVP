const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(201);
  res.send("Business registered");
});

router.post("/login", (req, res) => {
  res.status(200);
  res.send("Logged in to business account");
});

router.get("/profile", (req, res) => {
  res.status(200);
  res.send("Your business profile");
});

module.exports = router;
