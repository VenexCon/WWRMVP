const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const {
  session,
  webhook,
  createSessionPortal,
} = require("../controllers/stripeController");
const bodyParser = require("body-parser");

const app = express();

//webhook signature requires raw body for verification.
const matchRawBodyToJSON = bodyParser.raw({ type: "application/json" });
router.post("/webhook", matchRawBodyToJSON, webhook);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
router.post("/create-checkout-session", businessProtect, session);
router.post("/create-portal-session", businessProtect, createSessionPortal);
module.exports = router;
