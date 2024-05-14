import mongoose, { Schema } from "mongoose";

const defaultAvatar =
  "https://images.unsplash.com/photo-1583195763986-0231686dcd43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fHww";

const schema = new Schema(
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
      default: defaultAvatar,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

export default User;
