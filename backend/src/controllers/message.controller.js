import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log(req.user);
    const filteredUsers = await User.find({
      _id: {
        $ne: loggedInUserId,
      },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in getAllContacts: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    // Validate and convert userToChatId to ObjectId
    if (!ObjectId.isValid(userToChatId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const receiverId = new ObjectId(userToChatId);

    console.log(myId, receiverId);

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessagesByUserId:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = cloudinary.uploader.upload(image);
      imageUrl = (await uploadResponse).secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    newMessage.save();

    // Todo: Send message in real time if the receiver is  online - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Eerror in sendMessage controller: ${error}`);
    res.json(500).json({
      message: "Internal server error",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
        },
        {
          receiverId: loggedInUserId,
        },
      ],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: {
        $in: chatPartnerIds,
      },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
