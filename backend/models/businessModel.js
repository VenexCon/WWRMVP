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
  businessPhone: {
    type: "string",
    required: [true, "Please Include your phone number"],
  },
  businessPassword: {
    type: "string",
    required: [true, "Please Include a Password"],
  },
  businessAddress: {
    type: "string",
    required: true,
  },
  businessCoordinates: {
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
  businessResetToken: {
    type: String,
  },
  businessResetTokenExpiration: {
    type: Date,
  },
  activeSubscription: {
    type: Boolean,
  },
  listingAmount: {
    type: Number,
  },
  customerNo: {
    type: String,
  },
  checkoutSessionId: {
    type: String,
  },
  SubscriptionType: {
    type: String,
  },
});

businessSchema.index({ BusinessCoordinates: "2dsphere" });

module.exports = mongoose.model("Business", businessSchema);
