"use client";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import menuReducer from "./menu";

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
