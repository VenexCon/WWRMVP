const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  deleteMe,
  editUser,
  logoutUser,
} = require("../controllers/userController");

//@To-do create protect function to check JWT
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getMe)
  .delete(protect, deleteMe)
  .put(protect, editUser);

module.exports = router;
