import mongoose, { Schema, Types } from "mongoose";
import { wallpaperPositionList } from "../constants/constants.js";

const generateArray = (limit) => {
  return Array(limit)
    .fill(0)
    .map((_, i) => i + 1);
};

const schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    wallpaper: {
      type: String,
    },
    wallpaperActive: {
      type: Boolean,
      default: false,
    },
    wallpaperMode: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
    wallpaperPosition: {
      type: String,
      enum: [...wallpaperPositionList],
      default: "center",
    },
    messagesNotification: {
      type: Boolean,
      default: true,
    },
    callsNotification: {
      type: Boolean,
      default: true,
    },
    notificationMessagesTone: {
      type: Number,
      enum: generateArray(7),
      default: 1,
    },
    notificationGroupsTone: {
      type: Number,
      enum: generateArray(7),
      default: 1,
    },
  },
  { timestamps: true }
);

const UserPreferences = mongoose.model("UserPreferences", schema);

export default UserPreferences;
