import User from "../models/user.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudnary.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } });
    console.log(allUsers);

    res.json(allUsers);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: toChat } = req.params;
    const senderId = req.user._id;

    const userMessage = await Message.find({
      $or: [
        { sender: senderId, receiver: toChat },
        {
          sender: toChat,
          receiver: senderId,
        },
      ],
    });

    res.status(200).json(userMessage);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    const userId = req.user._id;

    const userToChat = User.findById(id);
    const myUser = User.findById(userId);

    const img = await cloudinary.uploader.upload(image);

    const newMessage = new Message({
      sender: userId,
      receiver: id,
      text,
      image: img.secure_url,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
