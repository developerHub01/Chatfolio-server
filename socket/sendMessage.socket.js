import Chat from "../models/chat.model.js";
import ChatPreference from "../models/chat.preference.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (data) => {
  const { message, senderId, receiverId, chatId } = data;

  if (!chatId) {
    try {
      const chat = await Chat.create({
        chatType: "personal",
        members: [senderId, receiverId],
      });
      try {
        const newMessage = await Message.create({
          message,
          author: senderId,
          chat: chat._id,
        });

        try {
          await ChatPreference.create({
            userId: senderId,
            chatId: chat._id,
            lastMessage: message,
            lastMessageAuthor: senderId,
          });
        } catch (error) {}

        return {};
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const newMessage = await Message.create({
        message,
        author: senderId,
        chat: chatId,
      });
      console.log(newMessage);
    } catch (error) {
      console.log(error.message);
    }
  }
};
