import { Schema } from "mongoose";

export const ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
        type: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        seen: {
            type: Boolean,
            default: false,
        },
    },
},{timestamps: true});

export const Conversation = mongoose.model('Conversation', ConversationSchema);