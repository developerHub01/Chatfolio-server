import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer(app);
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

import cookieSession from "cookie-session";
const PORT = process.env.PORT || 3000;
import { connectDB } from "./db/connection.js";
import passport from "passport";
import "./utils/googleLogin.js";

connectDB(process.env.MONGO_URI);

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";
// import { googleLogin } from "./utils/googleLogin.js";
import { facebookLogin } from "./utils/facebookLogin.js";
import session from "express-session";
import Chat from "./models/chat.model.js";
import Message from "./models/message.model.js";
import { sendMessageIO } from "./socket/message.socket.js";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// import "./seeds/createSeeds.js";

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_SECRET],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// googleLogin(passport);
facebookLogin(passport);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get("/", async (req, res) => {
  res.send("Health route...........");
});

sendMessageIO(io);

// io.on("connection", (socket) => {
//   socket.on("sendMessage", async (data) => {
//     const res = await axios.post("/chat/send-message", data);
//     const resData = await res.data;
//     console.log(resData);

//     // const { senderId, message, receiverId, chatId } = data;

//     // if (!chatId) {
//     //   try {
//     //     const chat = await Chat.create({
//     //       chatType: "personal",
//     //       members: [senderId, receiverId],
//     //     });
//     //     try {
//     //       const newMessage = await Message.create({
//     //         message,
//     //         author: senderId,
//     //         chat: chat._id,
//     //       });
//     //       console.log(newMessage);
//     //     } catch (error) {
//     //       console.log(error.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // } else {
//     //   try {
//     //     const newMessage = await Message.create({
//     //       message,
//     //       author: senderId,
//     //       chat: chatId,
//     //     });
//     //     console.log(newMessage);
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // }
//   });
//   socket.on("disconnect", () => {
//     console.log(socket.id + " leaved");
//   });
// });

app.use((error, req, res, next) => {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

server.listen(PORT, () => {
  console.log(`server is running it http://localhost:${PORT}`);
});
