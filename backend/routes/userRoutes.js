const express = require("express");
const router = express.Router();
const { body, validationResult, oneOf, check } = require("express-validator");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

//@To-do create protect function to check JWT
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
