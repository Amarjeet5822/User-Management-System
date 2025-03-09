const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");
const multer = require("multer");

const Login = async (req, res ) => {
  const { email, password } = req.body;
  const user = User.findOne({email});
  bcrypt.compare(password, user.password, (err, result) => {
    if(err) {
      return res.status(400).json({ message: "invalid credential!", err})
    }
    token = jwt.sign({ userId: user._id, role: user.role },process.env.SECRET_KEY );

    res.status(200).json({message: "Login Successfull", token});
  })
}

const Signup = async (req, res) => {
  const { password} = req.body;
  bcrypt.hash(password, process.env.SALT_ROUND, async (err, hash) => {
    if(err) {
      return res.status(400).json({message: "Password failed to hash", err})
    }
    const newUser = new User({...req.body, password: hash});
    await newUser.save()
    res.status(201).json({message: "Signup Successfull", newUser})
});
}
module.exports = { Login, Signup };