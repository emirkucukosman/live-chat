import Room, { IRoom } from "../models/Room";

export const findAll = async (): Promise<IRoom[]> => await Room.find({});

export const findOneByName = async (name: string): Promise<IRoom> => await Room.findOne({ name });

export const create = async (name: string, creator: string): Promise<IRoom> => {
  return await Room.create({
    name,
    creator,
  });
};
