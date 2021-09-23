import { Schema, Document, model } from "mongoose";
import { v4 } from "uuid";

export interface IRoom extends Document {
  roomId: string;
  name: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      default: v4(),
    },
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRoom>("Room", roomSchema);
