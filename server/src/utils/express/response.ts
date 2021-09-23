import { Request, Response, NextFunction } from "express";
import ApiError from "../errors";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(404)
    .json({ name: "NotFoundError", message: `Can not ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ name: error.name, message: error.message });
  }

  return res
    .status(500)
    .json({ name: "InternalServerError", message: "Unexpected error has occured" });
};
