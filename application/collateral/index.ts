"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Collateral, defaultCollateral } from "./types";

export interface CollateralState {
  collateral: Collateral;
  loadingSupply: boolean;
  loadingBorrow: boolean;
  loadingApproveSupply: boolean;
  loadingApproveBorrow: boolean;
  loading: boolean;
}

const initialState: CollateralState = {
  collateral: defaultCollateral,
  loadingSupply: false,
  loadingBorrow: false,
  loadingApproveSupply: false,
  loadingApproveBorrow: false,
  loading: false,
};

export const collateralReducer = createSlice({
  name: "collateral",
  initialState,
  reducers: {
    setLoadingSupply: (state, action: PayloadAction<boolean>) => {
      state.loadingSupply = action.payload;
    },

    setLoadingBorrow: (state, action: PayloadAction<boolean>) => {
      state.loadingBorrow = action.payload;
    },

    setLoadingApproveSupply: (state, action: PayloadAction<boolean>) => {
      state.loadingApproveSupply = action.payload;
    },

    setLoadingApproveBorrow: (state, action: PayloadAction<boolean>) => {
      state.loadingApproveBorrow = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setCollateral: (state, action: PayloadAction<Collateral | undefined>) => {
      state.collateral = { ...state.collateral, ...action.payload };
    },
  },
});

export const {
  setCollateral,
  setLoadingBorrow,
  setLoadingSupply,
  setLoading,
  setLoadingApproveSupply,
  setLoadingApproveBorrow,
} = collateralReducer.actions;

export default collateralReducer.reducer;
