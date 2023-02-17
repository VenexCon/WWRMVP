//imports
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

//connect to DB
connectDB();
const app = express();
app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "who wants rubbish api!" });
});

/* Routes */
app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
