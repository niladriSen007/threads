import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authorizedUserOrNot = async (req, res, next) => {
  try {
   const {token} = req.cookies;
  console.log(token)
    if(!token){
      return res.status(401).json("Unauthorized");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified)
    if(!verified){
      return res.status(401).json("You need to login first");
    }
    const user = await User.findById(verified?.id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//
