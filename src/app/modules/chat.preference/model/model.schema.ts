import { Schema } from "mongoose";
import { IChatPreference, IChatPreferenceModel } from "../chat.interface";
import { generateArray } from "../../../utils/utils";
import { Constatnt } from "../../../constants/constants";

const chatPreferenceSchema = new Schema<IChatPreference, IChatPreferenceModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chatId: {
      type: Schema.Types.ObjectId,
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
      enum: [...Constatnt.WALLPAPER_POSITION_LIST],
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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true },
);

export default chatPreferenceSchema;
