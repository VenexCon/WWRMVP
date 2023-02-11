const express = require("express");
const router = express.Router();

//@To-do create protect function to check JWT
router.post("/", (req, res) => {
  res.status(200).json({ message: "Placer register route here" });
});

router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
