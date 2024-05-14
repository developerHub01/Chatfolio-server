import { sendMessage } from "./sendMessage.socket.js";

export const sendMessageIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("sendMessage", async (data) => {
      sendMessage(data);
    });
    socket.on("disconnect", () => {
      console.log(socket.id + " leaved");
    });
  });
};
