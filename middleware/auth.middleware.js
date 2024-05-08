import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({});

export const isTokenExis = async (req, res, next) => {
  const token = req?.cookies[process.env.ACCESS_TOKEN];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "you are not logged in",
    });

  jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
    if (error)
      return res.status(error.status || 403).json({
        success: false,
        message: error.message || "you are not logged in",
      });

    req.user = user;

    return next();
  });
};
