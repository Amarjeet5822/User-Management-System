const express = require("express");
const { Login, Signup } = require("../controllers/authController");
const { loginMiddleware, singupMiddleware, isUserAuthenticated, isAccessable } = require("../middlewares/authMiddleware");
const { getUserDetails, updateUserDetails, deleteUser } = require("../controllers/userController");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const routes = express.Router();




const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/uploads',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
 
const parser = multer({ storage: storage });
 
// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });
routes.post("/login", loginMiddleware, parser.single('image') ,Login );
routes.post("/signup", singupMiddleware, Signup);

routes.get("/:id", isUserAuthenticated, isAccessable("admin"),  getUserDetails);
routes.patch("/:id", isUserAuthenticated, isAccessable("admin"), updateUserDetails);
routes.delete("/", isUserAuthenticated, isAccessable("admin"), deleteUser);

module.exports = routes;