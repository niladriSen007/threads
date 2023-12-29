import mongoose, { Schema } from "mongoose";

export const MessageSchema = new Schema(
  {
    text: String,
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    seen: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
