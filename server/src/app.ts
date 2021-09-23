import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { connect as mongooseConnect } from "mongoose";
import { Server as HTTPServer, createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import configureRoutes from "./config/routes";
import { errorHandler, notFoundHandler } from "./utils/express/response";

export default async (): Promise<{
  httpServer: HTTPServer;
  io: Server;
}> => {
  try {
    await mongooseConnect(process.env.MONGO_URL);
  } catch (error) {
    console.log(`Error while connecting to MongoDB: ${error}`);
  }

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.SOCKETIO_ORIGIN_URL || "*",
    },
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  configureRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return {
    httpServer,
    io,
  };
};
