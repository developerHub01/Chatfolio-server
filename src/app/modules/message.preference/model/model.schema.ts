import { Schema } from "mongoose";
import {
  IMessagePreference,
  IMessagePreferenceModel,
} from "../message.preference.interface";
import { generateArray } from "../../../utils/utils";
import { Constatnt } from "../../../constants/constants";

const messagePreferenceSchema = new Schema<
  IMessagePreference,
  IMessagePreferenceModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true },
);

export default messagePreferenceSchema;
