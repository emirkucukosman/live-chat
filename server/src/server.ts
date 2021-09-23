import configureApp from "./app";
// import configureSocket from "./utils/socket-io";

const PORT = process.env.PORT || 9090;
const ENV = process.env.NODE_ENV || "development";

const SOCKETS = {};

(async () => {
  configureApp()
    .then(({ httpServer, io }) => {
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

      httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} in ${ENV} mode.`);
      });
    })
    .catch((err: Error) => {
      console.log(`Error while configurin app: ${err}`);
    });
})();
