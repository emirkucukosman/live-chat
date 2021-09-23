export interface Room {
  roomId: string;
  name: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomState {
  fetchRoomsStatus: "idle" | "loading" | "success" | "fail";
  fetchRoomDetailsStatus: "idle" | "loading" | "success" | "fail";
  createRoomStatus: "idle" | "loading" | "success" | "fail";
  createdRoom: string | null;
  rooms: Room[];
  roomDetails: Room | null;
}
