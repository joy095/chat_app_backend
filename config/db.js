const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit();
  }
};

module.exports = connectDB;
