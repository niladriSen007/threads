import { handleError } from "../handlers/errorHander.js";
import { User } from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleError(error.message, 500);
  }
};

