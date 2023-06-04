const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  session,
  webhook,
  createSessionPortal,
} = require("../controllers/stripeController");
const bodyParser = require("body-parser");

const matchRawBodyToJSON = bodyParser.raw({ type: "application/json" });

router.post("/webhook", matchRawBodyToJSON, webhook);
router.post("/create-checkout-session", session);
router.post("/create-portal-session", createSessionPortal);
module.exports = router;
