import express from "express";
import { authorizedUserOrNot } from "../middlewares/authorizedUserOrNot.js";
import { getConversations, getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/getMessage/:otherUserId", authorizedUserOrNot, getMessages);
router.get("/getconversations", authorizedUserOrNot, getConversations);
router.post("/sendMessage",authorizedUserOrNot,sendMessage)

export default router;