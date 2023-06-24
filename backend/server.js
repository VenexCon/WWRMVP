//imports
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { monthlyListingUpdate } = require("./controllers/cronController");
//connect to DB
connectDB();
const app = express();

//Requires Raw Body First for stripe webhook.
/* app.use(bodyParser.raw({ type: "application/json" })); // Add this line before other middleware */

app.use("/api/stripe", require("./routes/stripeRoutes"));

//allows express to read JSON & requests.
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Scheduled CRON jobs
monthlyListingUpdate;

/* Routes */
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/business", require("./routes/businessRoutes"));
app.use("/api/listing", require("./routes/listingRoutes"));
app.use("/api/passwordReset", require("./routes/passwordResetRoutes"));
//errorhandler

app.use(errorHandler);

//Not needed on live
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
