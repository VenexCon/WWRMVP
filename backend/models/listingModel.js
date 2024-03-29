const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    listingTitle: {
      type: "string",
      required: [true, "Please include a title"],
    },
    listingDescription: {
      type: "string",
      required: [true, "Please Include a description"],
    },
    listingEmail: {
      type: "string",
      required: [true, "Please Include your Email Address"],
    },
    listingPhone: {
      type: "string",
      required: [true, "Please Include a contact for this listing"],
    },
    listingLocation: {
      type: "string",
      required: ["true", "Please include the location of your listing"],
    },
    business: {
      type: mongoose.Schema.Types.ObjectId, //relates to the user or business that created the listing.
      required: true,
      ref: "business",
    },
    listingCoordinates: {
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
  },
  { timestamps: true }
);

listingSchema.index({ listingCoordinates: "2dsphere" });

module.exports = mongoose.model("Listing", listingSchema);
