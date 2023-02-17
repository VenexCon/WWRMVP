const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  BusinessName: {
    type: "string",
    required: [true, "Please include your name"],
  },
  BusinessEmail: {
    type: "string",
    required: [true, "Please Include your Email Address"],
  },
  BusinessPassword: {
    type: "string",
    required: [true, "Please Include a Password"],
  },
  BusinessRegistrationNumber: {
    Type: "number",
    required: ["true", "Please include your business registration number"],
  },
});

module.exports = mongoose.model("Business", businessSchema);
