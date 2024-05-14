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
    chatId: {
      type: Types.ObjectId,
      ref: "Chat",
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
    isArchived: {
      type: Boolean,
      default: false,
    },
    lastMessageAuthor: {
      type: Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const ChatPreference = mongoose.model("ChatPreference", schema);

export default ChatPreference;
