import mongoose, { Schema } from "mongoose";

export const ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
        text: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        
    },
},{timestamps: true});

export const Conversation = mongoose.model('Conversation', ConversationSchema);