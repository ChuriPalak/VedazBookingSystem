import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected");

    socket.on("join-expert", (expertId) => {
      socket.join(expertId);
    });
  });
};

export const getIO = () => io;