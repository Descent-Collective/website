"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Alert } from "./types";

export interface AlertState {
  alert: Alert | undefined;
}

const initialState: AlertState = {
  alert: undefined,
};

export const alertReducer = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert | undefined>) => {
      if (!action.payload) {
        state.alert = undefined;
        return;
      }
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = alertReducer.actions;

export default alertReducer.reducer;
