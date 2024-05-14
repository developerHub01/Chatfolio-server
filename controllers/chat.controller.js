import { searchTypeList } from "../constants/constants.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import ChatPreference from "../models/chat.preference.model.js";
import { errorHandler } from "../utils/error.js";
import Message from "../models/message.model.js";

export const searchChat = async (req, res, next) => {
  const { id } = req?.user;

  const { page = 0, number: numberOfDocs = 5 } = req.query;

  if (!id) return next(errorHandler(401, "you are not logged in"));
  let { searchType, searchTerm, filterType } = req.body;

  switch (searchType) {
    case "name":
      searchType = "fullName";
      break;
    case "username":
      searchType = "userName";
      break;
    case "email":
      searchType = "email";
      break;
  }

  if (!searchTypeList.includes(searchType))
    return next(errorHandler(400, "Search type not valid"));

  if (!searchTerm) return next(errorHandler(400, "Search term not valid"));

  if (filterType === "all") {
    try {
      const chats = await User.find({
        [searchType]: { $regex: new RegExp(searchTerm, "i") },
      })
        .skip(page * numberOfDocs)
        .limit(numberOfDocs);

      return res.status(200).json({
        success: true,
        data: chats,
      });
    } catch (error) {
      return next(error);
    }
  } else {
    try {
      const chats = await Chat.find({
        // members: {
        //   // $all: [
        //   // {
        //   //   $elemMatch: { _id: id },
        //   // },
        //   // {
        //   $elemMatch: {
        //     fullName: searchTerm,
        //   },
        //   // },
        //   // ],
        // },
      }).populate("members", "userName email fullName");

      return res.status(200).json({
        success: true,
        data: chats,
      });
    } catch (error) {
      return next(error);
    }
  }

  // if (["username", "email"].includes(searchType)) {
  //   const searchQuery = {
  //     userName: searchType === "username" && searchTerm,
  //     email: searchType === "email" && searchTerm,
  //   };

  //   Object.entries(searchQuery).map(
  //     ([key, value]) => value || delete searchQuery[key]
  //   );

  //   try {
  //     const user = await User.findOne({ ...searchQuery });

  //     return res.status(200).json({
  //       success: true,
  //       data: user ? [user] : [],
  //     });
  //   } catch (error) {
  //     return next(error);
  //   }
  // } else {
  // }

  return next();
};

export const chatDetails = async (req, res, next) => {
  const { rechiverId } = req.body;
  const { chatType } = req.body;
  const { id: authorId } = req?.user;

  if (!authorId) return next(errorHandler(401, "You are not logged in!"));
  if (!rechiverId) return next(errorHandler(400, "Rechiver not selected"));

  try {
    const chat = await Chat.findOne({
      members: { $all: [authorId, rechiverId] },
      members: { $size: 2 },
    });
    return res.status(200).json({ success: true, data: chat });
  } catch (error) {
    return next(error);
  }
};

export const getMyChats = async (req, res, next) => {
  let { archived } = req.query;

  const { id: authorId } = req?.user;
  const { page = 0, number: numberOfDocs = 10 } = req.query;

  if (!authorId) return next(errorHandler(401, "You are not logged in!"));

  try {
    let chatList = await ChatPreference.find({
      userId: {
        _id: authorId,
      },
      isArchived: !!Number(archived),
    })
      .select("chatId isArchived lastMessage lastMessageAuthor _userId -_id")
      .populate({
        path: "chatId",
        populate: {
          path: "members admin",
          select: "_id fullName userName email updatedAt avatar",
        },
      })
      .populate({
        path: "lastMessageAuthor",
        select: "userName",
      })
      .skip(page * numberOfDocs)
      .limit(numberOfDocs);

    // creating project ================
    chatList = chatList.map(
      ({
        chatId: { _id, members, chatType, admin },
        isArchived,
        lastMessage,
        lastMessageAuthor: {
          _id: lastMessageUserId,
          userName: lastMessageUserName,
        },
      }) => {
        if (!admin)
          admin = members.find(
            ({ _id: adminId }) => adminId?.toString() !== authorId
          );

        return {
          _id,
          isArchived,
          chatType,
          admin,
          lastMessage,
          lastMessageUserName,
          lastMessageUserId,
        };
      }
    );

    return res.json({ success: true, data: chatList });
  } catch (error) {
    return next(error);
  }
};
