import { Schema } from "mongoose";
import { IChat, IChatModel } from "../chat.interface";

const chatSchema = new Schema<IChat, IChatModel>(
  {
    chatName: {
      type: String,
    },
    chatType: {
      type: String,
      enum: ["personal", "group", "channel"],
      default: "personal",
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      minLength: [2, "Minimum member 2"],
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isConnected: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

export default chatSchema;
