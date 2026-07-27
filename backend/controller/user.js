const User = require("../model/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../service/auth");
async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "ALL FIELDS REQUIRED" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "EMAIL ALREADY EXISTS" });
    }
    const bpass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: bpass,
    });
    const token = createToken({ _id: newUser._id, email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }); ///remember to set secure to true when deploying
    return res
      .status(201)
      .json({
        message: "User succesfully created",
        user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "ALL FIELDS REQUIRED" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "INVALID EMAIL OR PASSWORD" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken({ _id: user._id, email });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      }); ///remember to set secure to true when deploying
      return res.status(200).json({ message: "Login Succesfull" });
    } else {
      return res.status(401).json({ message: "INVALID EMAIL OR PASSWORD" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
function handleLogout(req, res) {
  console.log("Req reqched");
  res.clearCookie("token");
  return res.status(200).json({ message: "User Logged Out" });
}
async function handleGetCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function handleUpdateProfile(req, res) {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "NAME CANNOT BE EMPTY" });
    }
    const cleanedName = name.trim();
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: cleanedName },
      {returnDocument:"after"},
    ).select("name email");
    if (!updatedUser) {
      return res.status(404).json({
        message: "USER NOT FOUND",
      });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleLogout,
  handleGetCurrentUser,
  handleUpdateProfile,
};
