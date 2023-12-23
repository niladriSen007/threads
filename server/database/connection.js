import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
const DB = process.env.MONGO_URL;

export const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(DB)
        // console.log(connection)
        console.log(chalk.bgGreen("Connection Successful"))
    }
    catch(error){
        console.log(`Server error occured - ${error}`)
    }
} 