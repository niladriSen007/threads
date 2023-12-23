import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    
    postText: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    photo: {
       type: String,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    replies: [
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },  
            replyText: {
                type: String,
                required: true,
                trim: true,
                maxlength: 1000,
            },
            userImg: {
                type: String,
            },
            userName: {
                type: String,
            },
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema);