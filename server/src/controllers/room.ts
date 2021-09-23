import { Request, Response, NextFunction } from "express";
import * as RoomService from "../services/room";
import ApiError from "../utils/errors";

export const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await RoomService.findAll();
    return res.send(rooms);
  } catch (error) {
    return next(error);
  }
};

export const getOneByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;

    const room = await RoomService.findOneByName(name);
    if (!room) return next(ApiError.notFound("Room does not exist"));

    return res.send(room);
  } catch (error) {
    return next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, creator } = req.body;
    await RoomService.create(name, creator);
    return res.status(201).send({ success: true });
  } catch (error) {
    return next(error);
  }
};
