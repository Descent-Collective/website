"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SignUserResponse, User } from "./types";

export interface UserState {
  user: User | undefined;
  loading: boolean;
}

const initialState: UserState = {
  user: {
    id: "123hdty",
    name: "Justice Beaver",
  },
  loading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setUser: (state, action: PayloadAction<SignUserResponse | undefined>) => {
      if (!action.payload) {
        state.user = undefined;
        return;
      }
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setLoading, setUser } = userReducer.actions;

export default userReducer.reducer;
