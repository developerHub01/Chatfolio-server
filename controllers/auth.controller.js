import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

export const register = async (req, res, next) => {
  const { fullName, userName, email, password } = req.body;

  if (!fullName || !userName || !email || !password) {
    return next(errorHandler(405, "form is not filled"));
  }

  let user = await User.findOne({ email });
  if (user) return next(errorHandler(400, "Email is already in use..."));

  user = await User.findOne({ userName });
  if (user) return next(errorHandler(400, "That username is taken..."));

  const hashedPassword = hashSync(password, 10);

  try {
    await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
    });
    return res.status(201).json({ message: "Success", success: true });
  } catch (error) {
    return next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(errorHandler(401, "Wrong credentials"));

  const comparedPassword = compareSync(password, user.password);

  if (!comparedPassword) return next(errorHandler(401, "Wrong credentials"));

  const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res
    .cookie(process.env.ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ user, success: true });
};
export const logout = async (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ success: true, message: "Signout successfull" });
};
