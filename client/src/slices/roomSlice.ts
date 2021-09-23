import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomState } from "src/interfaces/Room";
import { getErrors } from "./errorSlice";
import type { RootState } from "src/app/store";
import api from "src/utils/api";

const initialState: RoomState = {
  fetchRoomsStatus: "idle",
  fetchRoomDetailsStatus: "idle",
  createRoomStatus: "idle",
  createdRoom: null,
  rooms: [],
  roomDetails: null,
};

export const fetchRooms = createAsyncThunk("room/fetchRooms", async (_, thunk) => {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error: any) {
    thunk.dispatch(getErrors({ id: "FETCH_ROOMS_ERROR", message: error }));
    return Promise.reject();
  }
});

export const fetchRoomDetails = createAsyncThunk(
  "room/fetchRoomDetails",
  async (name: string, thunk) => {
    try {
      const response = await api.get(`/rooms/${name}`);
      return response.data;
    } catch (error: any) {
      thunk.dispatch(getErrors({ id: "FETCH_ROOM_DETAILS_ERROR", message: error }));
      return Promise.reject();
    }
  }
);

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (data: { name: string; creator: string; password?: string }, thunk) => {
    try {
      await api.post("/rooms", data);
      return data;
    } catch (error: any) {
      thunk.dispatch(getErrors({ id: "CREATE_ROOM_ERROR", message: error }));
      return Promise.reject();
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.createRoomStatus = "idle";
      state.fetchRoomDetailsStatus = "idle";
      state.createdRoom = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.fetchRoomsStatus = "loading";
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.fetchRoomsStatus = "success";
      state.rooms = action.payload;
    });
    builder.addCase(fetchRooms.rejected, (state) => {
      state.fetchRoomsStatus = "fail";
    });
    // ----------------------------------------------------------------
    builder.addCase(fetchRoomDetails.pending, (state) => {
      state.fetchRoomDetailsStatus = "loading";
    });
    builder.addCase(fetchRoomDetails.fulfilled, (state, action) => {
      state.fetchRoomDetailsStatus = "success";
      state.roomDetails = action.payload;
    });
    builder.addCase(fetchRoomDetails.rejected, (state) => {
      state.fetchRoomDetailsStatus = "fail";
    });
    // ----------------------------------------------------------------
    builder.addCase(createRoom.pending, (state) => {
      state.createRoomStatus = "loading";
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.createRoomStatus = "success";
      state.createdRoom = action.payload.name;
    });
    builder.addCase(createRoom.rejected, (state) => {
      state.createRoomStatus = "fail";
    });
  },
});

export const { clearSuccess } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectRoomDetails = (state: RootState) => state.room.roomDetails;
export const selectCreatedRoom = (state: RootState) => state.room.createdRoom;
export const selectFetchRoomsStatus = (state: RootState) => state.room.fetchRoomsStatus;
export const selectFetchRoomDetailsStatus = (state: RootState) => state.room.fetchRoomDetailsStatus;
export const selectCreateRoomStatus = (state: RootState) => state.room.createRoomStatus;

export default roomSlice.reducer;
