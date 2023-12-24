import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary";

export const createPost = async (req, res) => {
     
    try {
        const {postText,postedBy} = req.body;
        const {photo} = req.body;
 
        if(!postText && !postedBy){
            return res.status(422).json({error:"Please add all the fields"})
        }

        const user = await User.findById(postedBy);

        if(!user){
            return res.status(422).json({error:"User not found"})
        }

        if(user?._id?.toString() !== req?.user?._id?.toString()){
            return res.status(422).json({error:"User not authorized"})
        }

        if(photo){
            const uploadResponse = await cloudinary.uploader.upload(photo, {
                upload_preset: "dev_setups",
            });
            const photoUrl = uploadResponse?.secure_url;
            const newPost = new Post({
                postText,
                photo : photoUrl,
                postedBy
            })
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }

        const newPost = new Post({postText,postedBy});
        const savedPost = await newPost.save();
    
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    }


export const getAllPostsWhomUserFollows = async (req, res) => {
    try {
        const posts = await Post.find({postedBy:{$in:req.user?.following}}).sort({createdAt:-1})

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(422).json({error:"Post not found"})
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(422).json({error:"Post not found"})
        }

        if(post?.postedBy?.toString() !== req?.user?._id?.toString()){
            return res.status(422).json({error:"User not authorized"})
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(422).json({error:"Post not found"})
        }

        const isLiked = post.likes.includes(req.user?._id);
        if(isLiked){
            await Post.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user._id}});
            res.status(200).json({message:"Post unliked successfully"});
        }else{
            await Post.findByIdAndUpdate(req.params.id,{$push:{likes:req.user._id}});
            res.status(200).json({message:"Post liked successfully"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(422).json({error:"Post not found"})
        }

        const {replyText} = req.body;

        if(!replyText){
            return res.status(422).json({error:"Please add all the fields"})
        }

        const comment = {
            replyText,
            userId:req.user?._id,
            userImg:req.user?.profileimg,
            userName:req.user?.name
        }

        await Post.findByIdAndUpdate(req.params.id,{$push:{replies:comment}});
        res.status(200).json({message:"Comment added successfully"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}