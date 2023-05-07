const { registerUser } = require("../../backend/controllers/userController");

const User = require("../../backend/models/userModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//Jest has no access to cookies, remove then test passes.
describe("registerUser function", () => {
  //Before the test function actually runs
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  //disconnect from DB once complete0
  afterAll(async () => {
    await mongoose.disconnect;
  });

  it("should register a user", async () => {
    const req = {
      body: {
        name: "john",
        email: "john@example.com",
        password: "Password1234!",
        terms: true,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: expect.any(Object),
        name: "john",
        email: "john@example.com",
        terms: true,
      })
    );
  });

  // after Each test, delete all users used for testing.
  afterEach(async () => {
    await User.deleteMany({});
  });
});
