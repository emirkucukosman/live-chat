import { Application } from "express";

import RoomRouter from "./room";

export default (app: Application) => {
  app.use("/rooms", RoomRouter);
};
