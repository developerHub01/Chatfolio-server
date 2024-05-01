import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 3000;
import {connectDB} from "./db/connection.js";

connectDB(process.env.MONGO_URI);

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", async (req, res) => {
  res.send("Health route...........");
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`server is running it http://localhost:${PORT}`);
});
