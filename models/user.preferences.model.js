import mongoose from "mongoose";

const generateArray = (limit) => {
  return Array(limit)
    .fill(0)
    .map((_, i) => i + 1);
};

const wallpaperPositionList = [
  "left-top",
  "top",
  "right-top",
  "left",
  "center",
  "right",
  "left-bottom",
  "bottom",
  "right-bottom",
];

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
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
