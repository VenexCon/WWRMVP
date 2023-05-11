const Business = require("../../backend/models/businessModel");
const User = require("../../backend/models/userModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { protect } = require("../../backend/middleware/authMiddleware");

describe("authMiddleware", () => {
  //connect DB
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  //disconnect DB
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Should return true if token is valid", async () => {});
});
