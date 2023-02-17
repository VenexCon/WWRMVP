const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
  listingTitle: {
    type: "string",
    required: [true, "Please include a title"],
  },
  listingDescription: {
    type: "string",
    required: [true, "Please Include your Email Address"],
  },
  listingLocation: {
    type: "string",
    required: ["true", "Please include the location of your listing"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, //relates to the user or business that created the listing.
    required: true,
    ref: "creator",
  },
});

module.exports = mongoose.model("Listing", listingSchema);
