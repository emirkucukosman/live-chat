import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorId, ErrorState } from "src/interfaces/Error";
import type { RootState } from "src/app/store";

const initialState: ErrorState = {
  id: null,
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    getErrors: (state, action: PayloadAction<{ id: ErrorId; message: string }>) => {
      state.id = action.payload.id;
      state.message = action.payload.message;
    },
    clearErrors: (state) => {
      state.id = null;
      state.message = null;
    },
  },
});

export const { getErrors, clearErrors } = errorSlice.actions;

export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;
