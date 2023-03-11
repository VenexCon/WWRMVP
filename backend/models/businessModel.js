const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  businessName: {
    type: "string",
    required: [true, "Please include your name"],
  },
  businessEmail: {
    type: "string",
    required: [true, "Please Include your Email Address"],
  },
  businessPassword: {
    type: "string",
    required: [true, "Please Include a Password"],
  },
  businessAddress: {
    type: "string",
    required: true,
  },
  businessGeolocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

businessSchema.index({ BusinessGeolocation: "2dsphere" });

module.exports = mongoose.model("Business", businessSchema);
