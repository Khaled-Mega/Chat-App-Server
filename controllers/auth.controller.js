import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordIsCorrect = await bcrypt.compare(
      password,
      user.password || "",
    );
    console.log(user);

    if (!passwordIsCorrect)
      return res.status(400).json({ message: "Wrong email or password" });

    generateToken(user._id, res);
    res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt")

    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePic = async (req, res) => {
  try {
    const { userPic } = req.body;
    const userId = req.user._id;
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!userPic)
      return res.status(400).json({ message: "Please provide a picture" });

    const newPic = cloudinary.uploader.upload(userPic);
    await User.findByIdAndUpdate(userId, { pic: newPic.secure_url });
    res.status(200).json({ message: "Picture updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById( userId );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
    console.log(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
