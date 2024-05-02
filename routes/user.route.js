import express from "express";
import { isTokenExis } from "../middleware/auth.middleware.js";
import { isLoggedIn } from "../controllers/user.controller.js";
const route = express.Router();

route.get("/me", isTokenExis, isLoggedIn);

export default route;
