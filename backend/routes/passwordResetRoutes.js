const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const {
  resetPassword,
  updateTokenAccount,
} = require("../controllers/passwordResetController");

router.post("/", resetPassword);
router.put("/updatePassword", updateTokenAccount);
module.exports = router;
