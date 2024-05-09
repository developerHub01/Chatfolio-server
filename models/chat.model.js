import mongoose from "mongoose";

const schema = new mongoose.Schema(
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
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      minLength: [2, "Minimum member 2"],
      required: true,
    },
    admin: {
      type: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", schema);

export default Chat;
