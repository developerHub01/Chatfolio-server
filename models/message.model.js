import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    watchList: {
      type: [
        {
          type: Types.ObjectId,
          ref: "User",
        },
      ],
    },
    replyToMessage: {
      type: Types.ObjectId,
      ref: "Message",
      default: null,
    },
    messageVideos: {
      type: [String],
    },
    messageImages: {
      type: [String],
    },
    messageAttachment: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", schema);

export default Message;
