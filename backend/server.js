//imports
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.status(201).json({ message: "who wants rubbish api!" });
});



/* Routes */
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

console.log("Server DB! ");
