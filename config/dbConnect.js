const mongoose = require("mongoose");
require("dotenv").config();


const dbUrl = process.env.dbUrl
const dbConnect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("db Connected with atlas")
  } catch (error) {
    console.log("error in db connect")
  }
}

module.exports = dbConnect;