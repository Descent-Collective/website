"use client";
import Descent from "@descent-protocol/sdk";
import { useAccount } from "wagmi";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setCollateral,
  setLoading,
  setLoadingApprove,
  setLoadingBorrow,
  setLoadingSupply,
} from ".";
import { CallbackProps } from "../store";

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { connector: activeConnector } = useAccount();

  const _descentProvider = async () => {
    try {
      if (!activeConnector) return;

      await activeConnector.connect();

      const connectedProvider = await activeConnector.getProvider();
      const descentApp = await Descent.create("browser", {
        collateral: "USDC",
        ethereum: connectedProvider,
      });

      return descentApp;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollateralInfo = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      const response = await descent.getCollateralInfo();

      return dispatch(setCollateral(response));
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const depositCollateral = async (
    amount: string,
    callback?: CallbackProps
  ) => {
    try {
      dispatch(setLoadingSupply(true));
      dispatch(setLoadingApprove(true));

      const descent = await _descentProvider();
      await descent.approveCollateral(amount);
      setLoadingApprove(false);
      const response = await descent.depositCollateral(amount);

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingSupply(false));
    }
  };

  const borrowXNGN = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingBorrow(true));

      const descent = await _descentProvider();
      const a = await descent.approveCollateral(amount);
      console.log("approved", a);
      const response = await descent.depositCollateral(amount);
      console.log("deposited", response);

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingBorrow(false));
    }
  };

  return {
    getCollateralInfo,
    depositCollateral,
  };
};

export default useCollateralActions;
