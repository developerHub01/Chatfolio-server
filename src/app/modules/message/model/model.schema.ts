import { Schema } from "mongoose";
import { IMessage, IMessageModel } from "../message.interface";
import { MessageConstant } from "../message.constant";

const messageSchema = new Schema<IMessage, IMessageModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "This is default bio.",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      required: false,
      default: MessageConstant.DEFAULT_AVATAR,
    },
  },
  { timestamps: true },
);

export default messageSchema;
