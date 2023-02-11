const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB Connected : ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
};


module.exports = connectDB