import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.find({
      participants: { $in: [userId] },
    });
    const messages = await Message.find({
      conversationId: conversation[0]._id,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const sendMessage = async (req, res) => {
    try {

        const { receiverId, text } = req.body;
        const sen = req.user._id;
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const getConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({
            participants: { $in: [userId] },
        });
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const newConversation = async (req, res) => {
    try {
        const newConversation = new Conversation({
            participants: [req.body.senderId, req.body.receiverId],
            lastMessage: {
                sender: req.body.senderId,
                text: req.body.text,
            },
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const updateLastMessage = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        await conversation.updateOne({
            $set: { lastMessage: req.body },
        });
        res.status(200).json("Conversation updated");
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const deleteConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        await Message.deleteMany({
            conversationId: conversation._id,
        });
        await conversation.deleteOne();
        res.status(200).json("Conversation deleted");
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const deleteMessage = async (req, res) => {
    try {
        await Message.deleteOne({ _id: req.params.id });
        res.status(200).json("Message deleted");
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const updateMessage = async (req, res) => {
    try {
        await Message.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json("Message updated");
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const getMessagesFromConversation = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
    }

export const getConversationByTwoUsers = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            participants: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
    }


