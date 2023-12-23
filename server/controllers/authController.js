import { confirmPassword } from "../handlers/confirmPassword.js";
import { handleError } from "../handlers/errorHander.js";
import { generateJWTToken } from "../handlers/generateJWTToken.js";
import { hashPassword } from "../handlers/hashPassword.js";
import { User } from "../models/userModel.js";

export const RegisterUser = async (req, res) => {
  try {
  
    const { name, username, email, password, confirmpassword } = req.body;

    // Check if all fields are filled
    if (!name || !username || !email || !password || !confirmpassword) {
      return res.status(400).json({ error: "Please fill all fields" });
      //   handleError("Please fill all fields", 400);
    }

    // Check if user exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ error: "User already exists" });
      //   handleError("User already exists", 500);
    }

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
      //   handleError("Password and confirm password do not match", 500);
    }

    //encrypt the password the user has entered
    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    }).save();

    const token = await generateJWTToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    handleError(error.message, 500);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
      //   handleError("Please fill all fields", 400);
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
      //   handleError("User does not exist", 500);
    }

    // Check if password and confirm password match
    const isPasswordMatch = await confirmPassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
      //   handleError("Invalid credentials", 500);
    }

    const token = await generateJWTToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    handleError(error.message, 500);
  }
};
