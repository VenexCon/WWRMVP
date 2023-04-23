const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const { resetPassword } = require("../controllers/passwordResetController");

router.post("/", resetPassword);

module.exports = router;
