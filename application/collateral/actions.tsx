"use client";
import Descent from "@descent-protocol/sdk";
import { useAccount } from "wagmi";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setCollateral,
  setLoading,
  setLoadingApproveBorrow,
  setLoadingApproveSupply,
  setLoadingBorrow,
  setLoadingSupply,
} from ".";
import { CallbackProps } from "../store";
import useAlertActions from "../alert/actions";

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { connector: activeConnector } = useAccount();
  const { alertUser } = useAlertActions();

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
      dispatch(setLoadingApproveSupply(true));

      const descent = await _descentProvider();

      const amountToApprove = Number(amount) + 0.1;

      await descent.approveCollateral(amountToApprove.toString());
      dispatch(setLoadingApproveSupply(false));

      dispatch(setLoadingSupply(true));
      const response = await descent.depositCollateral(amount);

      alertUser({
        title: "Bravo! Collateral deposited.",
        variant: "success",
        message: (
          <div>
            Your collateral deposit of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} USDC
            </span>{" "}
            was successful.
          </div>
        ),
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);

      alertUser({
        title: "Collateral deposited unsuccessful.",
        variant: "error",
        message: (
          <div>
            Your collateral deposit of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} USDC
            </span>{" "}
            was not successful. Please try again.
          </div>
        ),
      });
    } finally {
      dispatch(setLoadingApproveSupply(false));
      dispatch(setLoadingSupply(false));
    }
  };

  const borrowXNGN = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingBorrow(true));

      const descent = await _descentProvider();

      const response = await descent.borrowCurrency(amount);

      alertUser({
        title: "Bravo! Loan Approved.",
        variant: "success",
        message: (
          <div>
            Your loan of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} xNGN
            </span>{" "}
            has been approved and successfully disbursed. Congratulations!
          </div>
        ),
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);

      alertUser({
        title: "Loan request unsuccessful.",
        variant: "error",
        message: (
          <div>
            Your loan of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} xNGN
            </span>{" "}
            was not successful. Please try again.
          </div>
        ),
      });
    } finally {
      dispatch(setLoadingApproveBorrow(false));
      dispatch(setLoadingBorrow(false));
    }
  };

  return {
    getCollateralInfo,
    depositCollateral,
    borrowXNGN,
  };
};

export default useCollateralActions;
