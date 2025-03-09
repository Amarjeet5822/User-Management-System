const User = require("../models/user.model");


const getUserDetails = async (req, res ) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({_id: id });
    if(!user) {
      res.status(404).json({message:"user not Found"})
    }
    res.status(200).json({user})
  } catch (error) {
    return res.status(400).json({message:"Unauthorized", error})
  }
}

const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate({_id: id }, {...req.body});
    res.status(200).json({ message: "User updated successfully",user})
  } catch (error) {
    return res.status(400).json({message:"Unauthorized", error})
  }
}
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete({_id: id });
    res.status(200).json({message: "User Deleted Successfully"})
  } catch (error) {
    return res.status(400).json({message:"Unauthorized", error})
  }
}

module.exports = { deleteUser, updateUserDetails, getUserDetails}