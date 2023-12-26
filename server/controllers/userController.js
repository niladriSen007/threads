import { handleError } from "../handlers/errorHander.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";

export const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({username : req.params?.name});

    if (!user) {
      return res.status(404).json("user not exists");
    }

    const { password, confirmpassword, updatedAt, ...other } = user?._doc;

    res.status(200).json(other);
  } catch (error) {
    handleError(error.message, 500);
  }
};


export const getUserById = async (req, res) => {
  // console.log("Id"+req.params?.id)
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log("Inside")
      return res.status(404).json("user not exists");
    }

    const { password, confirmpassword, updatedAt, ...other } = user?._doc;

    res.status(200).json(other);
  } catch (error) {
    handleError(error.message, 500);
  }
}

export const getOwnDetails = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id);

    if (!user) {
      return res.status(404).json("user not exists");
    }

    const { password, confirmpassword, updatedAt, ...other } = user?._doc;

    res.status(200).json(other);
  } catch (error) {
    handleError(error.message, 500);
  }
}


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    // const { name, username, email, password,bio } = req.body;

    console.log(req.body?.profileimg)

    const user = await User.findById(userId);

    if(req.body?.profileimg){

      //if user gives new profile image then delete previous one otherwise it will be stored in cloudinary and will be wasted
      if(user?.profileimg){
        const publicId = user?.profileimg?.split("/")[7].split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const fileStr = req.body?.profileimg;
      const uploadResponse = await cloudinary.uploader.upload(fileStr);
      const newData = {
        name: req.body?.name || user?.name,
        username: req.body?.username || user?.username,
        email: req.body?.email || user?.email,
        bio: req.body?.bio || user?.bio,
        profileimg: uploadResponse?.secure_url || user?.profileimg,
      };
      const updatedUser = await User.findByIdAndUpdate(userId, newData, {
        new: true,
      });
      const { password: _, confirmpassword: __, ...other } = updatedUser?._doc;
      return res.status(200).json(other);
    }

    let newData = {
      name: req.body?.name || user?.name,
      username: req.body?.username || user?.username,
      email: req.body?.email || user?.email,
      bio: req.body?.bio || user?.bio,
    };

    if (!user) {
      return res.status(404).json("user not exists");
    }

    let hashedPassword;
    if (req.body?.password) {
      hashedPassword = await bcrypt.hash(password, 10);
      newData = { ...newData, password: hashedPassword };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    const { password: _, confirmpassword: __, ...other } = updatedUser?._doc;

    res.status(200).json(other);
  } catch (error) {
    handleError(error.message, 500);
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    console.log(id);
    const userToBeFollowed = await User.findById(id);
    const currentUser = await User.findById(req?.user?._id);
    let user1,user2;

    if (!userToBeFollowed) {
      return res.status(404).json("user not exists");
    }

    if (id === req?.user?._id.toString()) {
      return res.status(403).json("you cannot follow or unfollow yourself");
    }

    if (!userToBeFollowed?.followers?.includes(currentUser?._id)) {
      user1 = await User.findByIdAndUpdate(
        id,
        { $push: { followers: currentUser?._id } },
        { new: true }
      );
      user2 = await User.findByIdAndUpdate(
        currentUser?._id,
        { $push: { following: id } },
        { new: true }
      );
      return res.status(200).json(user2);
    } else {
      user1 = await User.findByIdAndUpdate(
        id,
        { $pull: { followers: currentUser?._id } },
        { new: true }
      );
      user2 =  await User.findByIdAndUpdate(
        currentUser?._id,
        { $pull: { following: id } },
        { new: true }
      );
      return res.status(200).json(user2);
    }
    return res.status(200).json("user not exists");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  console.log(req.user)
  try {
    const users = await User.find({_id:{$ne:req.user?._id}}).sort({createdAt:-1});
    // return res.status(200).json(users);
    if (!users) {
      return res.status(404).json("No User exists");
    }



    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
