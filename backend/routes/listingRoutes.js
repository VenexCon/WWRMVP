const express = require("express");
const { businessProtect } = require("../middleware/businessAuthMiddleware");
const router = express.Router();
const { createTicket } = require("../controllers/listingController");

router.post("/new", businessProtect, createTicket);

module.exports = router;
