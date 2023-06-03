const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const { session } = require("../controllers/stripeController");

router.post("/create-checkout-session", session);

module.exports = router;
