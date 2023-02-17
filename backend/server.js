//imports
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

//connect to DB
//connectDB(); // disabled due to flight mode
const app = express();

//allows express to red JSON & requests.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//not required when launched live
app.get("/", (req, res) => {
  res.status(201).json({ message: "who wants rubbish api!" });
});

/* Routes */
app.use("/users", require("./routes/userRoutes"));
//errorhandler
app.use(errorHandler);

//Not needed on live
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
