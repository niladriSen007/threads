import { handleError } from "../handlers/errorHander.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

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

    const user = await User.findById(userId);

    let newData = {
      name: req.body?.name || user?.name,
      username: req.body?.username || user?.username,
      email: req.body?.email || user?.email,
      bio: req.body?.bio || user?.bio,
      password: req.body?.password || user?.password,
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

    res.status(200).json(updatedUser);
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

    if (!userToBeFollowed) {
      return res.status(404).json("user not exists");
    }

    if (id === req?.user?._id.toString()) {
      return res.status(403).json("you cannot follow or unfollow yourself");
    }

    if (!userToBeFollowed?.followers?.includes(currentUser?._id)) {
      await User.findByIdAndUpdate(
        id,
        { $push: { followers: currentUser?._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        currentUser?._id,
        { $push: { following: id } },
        { new: true }
      );
      return res.status(200).json("user has been followed");
    } else {
      await User.findByIdAndUpdate(
        id,
        { $pull: { followers: currentUser?._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        currentUser?._id,
        { $pull: { following: id } },
        { new: true }
      );
      return res.status(200).json("user has been unfollowed");
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
