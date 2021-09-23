import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "src/slices/roomSlice";
import errorReducer from "src/slices/errorSlice";

const store = configureStore({
  reducer: {
    room: roomReducer,
    error: errorReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;

export default store;
