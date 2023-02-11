//imports
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "who wants rubbish api!" });
});

/* Routes */
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

console.log("Server DB! ");
