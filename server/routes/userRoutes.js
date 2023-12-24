import express from "express";
import { followUnfollowUser, getAllUsers, getOwnDetails, getUserById, getUserByName, updateProfile } from "../controllers/userController.js";
import { authorizedUserOrNot } from "../middlewares/authorizedUserOrNot.js";
const router = express.Router();


router.get("/profile",authorizedUserOrNot , getOwnDetails);
router.get("/getAllUsers",authorizedUserOrNot , getAllUsers);
router.get("/profile/:name", getUserByName);
router.get("/getProfile/:id", getUserById);
router.put("/followOrUnfollow/:id",authorizedUserOrNot, followUnfollowUser);
router.put("/updateProfile/:id",authorizedUserOrNot, updateProfile);



export default router;
