"use client";
import Descent from "@descent-protocol/sdk";
import { useAccount } from "wagmi";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setCollateral,
  setLoading,
  setLoadingApproveBorrow,
  setLoadingApproveRepay,
  setLoadingApproveSupply,
  setLoadingBorrow,
  setLoadingRepay,
  setLoadingSupply,
  setLoadingWithdraw,
} from ".";
import { CallbackProps } from "../store";
import useAlertActions from "../alert/actions";
import useTransactionListener from "@/hooks/useTransaction";

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { connector: activeConnector } = useAccount();
  const { alertUser } = useAlertActions();
  const { listener } = useTransactionListener();

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

      await descent.approveCollateral!(amount);
      dispatch(setLoadingApproveSupply(false));

      dispatch(setLoadingSupply(true));
      const response = await descent.depositCollateral(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "deposit",
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log("an error occured", error);
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
      console.log(response);
      listener({
        hash: response?.hash,
        amount,
        type: "borrow",
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);

      alertUser({
        title: "Borrow unsuccessful.",
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

  const repayXNGN = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingRepay(true));
      const descent = await _descentProvider();

      const response = await descent.repayCurrency(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "repay",
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);

      alertUser({
        title: "Loan repayment unsuccessful.",
        variant: "error",
        message: (
          <div>
            Your loan repayment of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} xNGN
            </span>{" "}
            was not successful. Please try again.
          </div>
        ),
      });
    } finally {
      dispatch(setLoadingApproveRepay(false));
      dispatch(setLoadingRepay(false));
    }
  };

  const withdrawCollateral = async (
    amount: string,
    callback?: CallbackProps
  ) => {
    try {
      dispatch(setLoadingWithdraw(true));

      const descent = await _descentProvider();
      const response = await descent.withdrawCollateral(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "withdraw",
      });

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);

      alertUser({
        title: "Collateral withdrawal unsuccessful.",
        variant: "error",
        message: (
          <div>
            Your withdrawal request of{" "}
            <span className="text-black-100">
              {Number(amount).toLocaleString()} USDC
            </span>{" "}
            was not successful. Please try again.
          </div>
        ),
      });
    } finally {
      dispatch(setLoadingWithdraw(false));
    }
  };

  return {
    getCollateralInfo,
    depositCollateral,
    borrowXNGN,
    repayXNGN,
    withdrawCollateral,
  };
};

export default useCollateralActions;
