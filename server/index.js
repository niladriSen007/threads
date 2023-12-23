/**
 * This file serves as the entry point for the server application.
 * It imports necessary modules, sets up middleware, and starts the server.
 */
import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./database/connection.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

const app = express();
dotenv.config();

connectDB();

//middlewares
// This line of code is using the express.json() middleware. This middleware is used to parse incoming requests with JSON payloads. In other words, it allows the server to read JSON from the request body. This is particularly useful when you're receiving POST or PUT request data via JSON.

app.use(express.json());

// This line of code is using the express.urlencoded() middleware. This middleware is used to parse incoming requests with URL-encoded payloads. The "extended: true" option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

app.use(express.urlencoded({ extended: true }));

// This line of code is using the cookie-parser middleware. This middleware is used to parse Cookie header and populate req.cookies with an object keyed by the cookie names. This allows you to work with cookies sent back from the client.

app.use(cookieParser());
app.use(cors())


//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
);
