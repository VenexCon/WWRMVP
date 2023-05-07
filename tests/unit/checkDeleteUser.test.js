const { deleteMe } = require("../../backend/controllers/userController");

const Business = require("../../backend/models/businessModel");
const User = require("../../backend/models/userModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

describe("check if user is deleted from DB", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  // no need for beforeEach ads we will create, then delete the user in the same func
  it("Should delete the current user", async () => {
    const mockUser = new User({
      name: "john",
      email: "john@example.com",
      password: "Password1234!",
    });

    //save user to DB
    await mockUser.save();

    //mock request
    const req = {
      user: { _id: mockUser._id },
    };
    //mock response
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteMe(req, res);

    //what is deleteMe returning?
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Deleted",
    });

    const deletedUser = await User.findById(mockUser._id);
    expect(deletedUser).toBeNull();
  });
});
