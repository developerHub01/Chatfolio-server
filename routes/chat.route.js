import express from "express";
import { isTokenExis } from "../middleware/auth.middleware.js";
import { searchChat } from "../controllers/chat.controller.js";
const route = express.Router();

route.post("/search-chat", isTokenExis, searchChat);

export default route;
