const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

//@To-do create protect function to check JWT
router.post("/", (req, res) => {
  res.send("Register Route");
});

router.post("/login", loginUser);

router.get("/me", (req, res) => {
  res.status(201).json({ message: "Get me once logged in!" });
});

module.exports = router;
