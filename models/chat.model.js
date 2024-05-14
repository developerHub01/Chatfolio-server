import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema(
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
          type: Types.ObjectId,
          ref: "User",
        },
      ],
      minLength: [2, "Minimum member 2"],
      required: true,
    },
    admin: {
      type: Types.ObjectId,
      ref: "User",
    },
    isConnected: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", schema);

export default Chat;
