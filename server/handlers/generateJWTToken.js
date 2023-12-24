import jwt from "jsonwebtoken";
export const generateJWTToken =  (userId,res) => {
    const token =  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d", // token will expire in 30 days
    });

    console.log(token,"Token")

    res.cookie("token", token, {
        httpOnly: true, // client side js cannot access the cookie
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // cookie will be removed after 30 days
        
    });

    return token;
    }