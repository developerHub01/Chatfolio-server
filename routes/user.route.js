import express from "express";
import { isTokenExis } from "../middleware/auth.middleware.js";
import {
  getPreferencesData,
  isLoggedIn,
  updateUserInfo,
  updatePreferencesData,
} from "../controllers/user.controller.js";
import { uploadFile } from "../middleware/multer.middleware.js";
const route = express.Router();

const WALLPAPER_FIELD = "wallpaper";
const AVATAR_FIELD = "avatar";

route.get("/me", isTokenExis, isLoggedIn);
route.patch(
  "/updateUserInfo",
  isTokenExis,
  uploadFile("single", AVATAR_FIELD),
  updateUserInfo
);
route.get("/preferences", isTokenExis, getPreferencesData);
route.patch(
  "/preferences",
  isTokenExis,
  uploadFile("single", WALLPAPER_FIELD),
  updatePreferencesData
);

export default route;
