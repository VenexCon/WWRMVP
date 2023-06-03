const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const { session, webhook } = require("../controllers/stripeController");

router.post("/webhook", webhook);
router.post("/create-checkout-session", session);
module.exports = router;
