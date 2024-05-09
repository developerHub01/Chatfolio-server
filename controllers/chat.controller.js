import { searchTypeList } from "../constants/constants.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const searchChat = async (req, res, next) => {
  const { id } = req?.user;

  const { page = 0, number: numberOfDocs = 5 } = req.query;

  console.log(id, page, numberOfDocs, req.body.searchType, req.body.searchTerm);

  if (!id) return next(errorHandler(401, "you are not logged in"));
  const { searchType, searchTerm } = req.body;

  if (!searchTypeList.includes(searchType))
    return next(errorHandler(400, "Search type not valid"));

  if (!searchTerm) return next(errorHandler(400, "Search term not valid"));

  if (searchType === "name") {
    try {
      const users = await User.find({
        fullName: { $regex: new RegExp(searchTerm, "i") },
      })
        .skip(page * numberOfDocs)
        .limit(numberOfDocs);

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return next(error);
    }
  }

  if (["username", "email"].includes(searchType)) {
    const searchQuery = {
      userName: searchType === "username" && searchTerm,
      email: searchType === "email" && searchTerm,
    };

    Object.entries(searchQuery).map(
      ([key, value]) => value || delete searchQuery[key]
    );

    try {
      const user = await User.findOne({ ...searchQuery });

      return res.status(200).json({
        success: true,
        data: user ? [user] : [],
      });
    } catch (error) {
      return next(error);
    }
  } else {
  }

  return next();
};
