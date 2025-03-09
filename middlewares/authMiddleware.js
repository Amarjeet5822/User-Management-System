const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const isUserAuthenticated = ( req, res, next ) => {
  const token = req.cookie.refreshToken;
  decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = { userId: decoded.userId, role: decoded.role }
  next();
}

const isAccessable = (array) => {
  const { id } = req.params;
  const { userId} = req.user;
  return (req, res, next) => {
    if(String(userId) === String(id) || array.includes("admin")) {
      next();
    }
  }
}

const isAdmin = (req, res, next ) => {
  return (array) => { 
   // write logic
  }
}


const loginMiddleware = (req, res, next) => {
  const { email, password} = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "missing Fields!"})
  };
  const user = User.findOne({email});
  if(!user) {
    return res.status(404).json({ message: "User not Found"})
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if(err) {
      return res.status(400).json({ message: "invalid credential!", err})
    }
});
  if(email && !password) {
    return res.status(400).json({ message: "missing Fields!"})
  }
  next();
}

const singupMiddleware = (req, res, next ) => {
  const { email, password, fistName, lastName, images } =  req.body;
  if(!email || !password || !fistName || !lastName || !images) {
    return res.status(400).json({ message: "missing Fields!"})
  }
  next()
}

module.exports = { loginMiddleware, singupMiddleware, isUserAuthenticated, isAccessable };