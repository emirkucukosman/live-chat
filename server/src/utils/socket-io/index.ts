import { Server } from "socket.io";

const SOCKETS = {};

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected with id: ${socket.id}`);

    socket.on("join room", (room) => {
      SOCKETS[socket.id] = room;
      socket.broadcast.to(room).emit("user joined", "A new user has joined the room!");
      socket.join(room);
      console.log("join room ", socket.id);
    });

    socket.on("send message", ({ name, message, room }) => {
      io.to(room).emit("new message", { name, message });
    });

    socket.on("disconnect", () => {
      socket.broadcast.to(SOCKETS[socket.id]).emit("user left", "A user has left the room");
      delete SOCKETS[socket.id];
      console.log("socket disconnected ", socket.id);
    });
  });
};
