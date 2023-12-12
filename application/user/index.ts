"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User, defaultUser } from "./types";

export interface UserState {
  user: User;
  loading: boolean;
}

const initialState: UserState = {
  user: defaultUser,
  loading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setLoading, setUser } = userReducer.actions;

export default userReducer.reducer;
