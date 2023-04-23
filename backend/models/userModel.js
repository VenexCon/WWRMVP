const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: "string",
    required: [true, "Please include your name"],
  },
  email: {
    type: "string",
    required: [true, "Please Include your Email Address"],
  },
  password: {
    type: "string",
    required: [true, "Please Include a Password"],
  },
  agreedTerms: {
    type: Boolean,
    required: [true, "Please agree to terms"],
    default: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
