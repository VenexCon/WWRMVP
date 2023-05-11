const {
  checkIfUserOrBusinessExists,
} = require("../../backend/controllers/userController");

const Business = require("../../backend/models/businessModel");
const User = require("../../backend/models/userModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

describe("checkIfUserOrBusinessExists", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    //create test user and add to DB
    const user = new User({
      email: "testuser@example.com",
      password: "Password1234",
      name: "Connor Davies",
    });
    await user.save();

    const business = new Business({
      businessName: "My Business",
      businessEmail: "test@mybusiness.com",
      businessPhone: "1234567890",
      businessPassword: "mypassword",
      businessAddress: "123 Main St",
      businessCoordinates: {
        type: "Point",
        coordinates: [-122.084, 37.4219999],
      },
    });
    await business.save();
  });

  afterEach(async () => {
    // Remove the test user and business from your database
    await User.deleteMany({});
    await Business.deleteMany({});
  });

  it("returns true if a user and business exists", async () => {
    const email = "testuser@example.com";
    const result = await checkIfUserOrBusinessExists(email);
    expect(result).toBe(true);
  });

  it("returns false if no user or business with the email exists", async () => {
    const email = "nonexistant@example.com";
    const result = await checkIfUserOrBusinessExists(email);
    expect(result).toBe(false);
  });
});
