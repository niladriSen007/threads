import express from "express";
import { authorizedUserOrNot } from "../middlewares/authorizedUserOrNot.js";
import { addComment, createPost, deletePost, getAllPostsWhomUserFollows, getPostById, likeUnlikePost,getOwnAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/create",authorizedUserOrNot,createPost);
router.get("/getAll",authorizedUserOrNot,getAllPostsWhomUserFollows);
router.get("/getAllPosts/:id",authorizedUserOrNot,getOwnAllPosts);
router.get("/getPost/:id",getPostById);
router.delete("/deletePost/:id",authorizedUserOrNot,deletePost);
router.put("/likeOrUnlikePost/:id",authorizedUserOrNot,likeUnlikePost);
router.post("/reply/:id",authorizedUserOrNot,addComment);

export default router;