import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const isLoggedIn = async (req, res) => {
  if (!req.user || !req?.user?.id)
    next(errorHandler(401, "You are not logged in"));

  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(401, "You are not logged in"));

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
