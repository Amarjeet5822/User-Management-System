const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fisrtName: {type: String, required: true },
  lastName: {type: String, required: true },
  email: {type: String, required: true },
  password : {type: String, required: true },
  images:[{type:String, required: true}], 
  role: {type: String, enum:["admin", "user"], default: "user" },
})

const User = mongoose.model("User", userSchema);

module.exports = User;

// personal information, including a profile picture.
// Ensure the profile picture is in JPG or PNG format and properly saved to the server using Multer for handling file uploads.