import express from "express";
import { isTokenExis } from "../middleware/auth.middleware.js";
import {
  chatDetails,
  getMyChats,
  searchChat,
} from "../controllers/chat.controller.js";
const route = express.Router();

route.post("/search-chat", isTokenExis, searchChat);
route.post("/chat-details", isTokenExis, chatDetails);
route.get("/my-chats", isTokenExis, getMyChats);

export default route;
