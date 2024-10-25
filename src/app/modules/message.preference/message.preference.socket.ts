import { Server, Socket } from "socket.io";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const registerChatSocketHandlers = (socket: Socket, io: Server) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket.on("get_followers_count", async ({ channelId }) => {
    

    // socket.emit(`followers_count_${channelId}`, followersCount);
  });
};

export default registerChatSocketHandlers;
