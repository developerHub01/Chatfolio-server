import { Schema } from "mongoose";
import { IUser, IUserModel } from "../user.interface";
import { UserConstant } from "../user.constant";

const userSchema = new Schema<IUser, IUserModel>(
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
      default: UserConstant.DEFAULT_AVATAR,
    },
  },
  { timestamps: true },
);

export default userSchema;
