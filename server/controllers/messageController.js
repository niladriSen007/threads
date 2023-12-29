import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user?._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) return res.status(200).json([]);

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user?._id;

    console.log(senderId, receiverId, text);

    //To check does user have any previous conversation history with the receiver or not
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // console.log(conversation,"conv")

    // let newConversation;
    if (!conversation) {
      // console.log("In no conv")
      conversation = new Conversation({
        participants: [senderId, receiverId],
        lastMessage: {
          sender: senderId,
          text: text,
        },
      });
      await conversation.save();
    }
    // console.log(newConversation,conversation)

    const newMessage = new Message({
      conversationId: conversation?._id,
      sender: senderId,
      receiver: receiverId,
      text: text,
    });

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: text,
          sender: senderId,
        },
      }),
    ]);

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user?._id;
    const conversations = await Conversation.find({
      participants: userId,
    }).populate({
      path: "participants",
      select: "username profileimg",
    });

    conversations?.forEach((conversation) => {
      conversation.participants = conversation?.participants?.filter(
        (participant) => participant?._id?.toString() !== userId.toString()
      );
    });

    return res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
};
