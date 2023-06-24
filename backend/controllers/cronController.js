const cron = require("node-cron");
const Business = require("../models/businessModel");
const asyncHandler = require("express-async-handler");

//@Desc - Fires at the start of each month and updates all business units with a non-activeSubscription.
//@desc - Should only fire once per month.
const monthlyListingUpdate = cron.schedule(
  "0 0 0 */1 * *",
  asyncHandler(async () => {
    try {
      // Fetch all business units
      const businessUnits = await Business.find();
      console.log("node cron ran");

      // Iterate over each business unit
      businessUnits.forEach(async (businessUnit) => {
        // Check if the business unit does not have a paid plan
        if (!businessUnit.activeSubscription) {
          // Add 10 to the listingsAmount
          businessUnit.listingAmount = 10;

          // Save the updated business unit
          await businessUnit.save();
        }
      });

      console.log("Cron job executed successfully.");
    } catch (error) {
      res.status(500);
      console.error("Error executing cron job:", error);
    }
  })
);

module.exports = { monthlyListingUpdate };
