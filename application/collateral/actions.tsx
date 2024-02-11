"use client";
import Descent from "@descent-protocol/sdk";

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
import { setClearInputs } from "../input";
import { setLoadingAlert } from "../alert";
import { ethers } from "ethers";

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { alertUser } = useAlertActions();
  const { listener } = useTransactionListener();

  const _descentProvider = async () => {
    try {

      const descentApp = await Descent.create("https", {
        collateral: "USDC",
        rpcUrl: process.env.NEXT_PUBLIC_BASE_TESTNET_RPC_URL,
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
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
 const newResponse = {
        totalDepositedCollateral: ethers.formatUnits(
          response?.totalDepositedCollateral?.toString(),
          6,
        ),
        totalBorrowedAmount: ethers.formatUnits(response?.totalBorrowedAmount?.toString(), 18),
        liquidationThreshold: ethers.formatUnits(response?.liquidationThreshold?.toString(), 18),
        debtCeiling: ethers.formatUnits(response?.debtCeiling?.toString(), 18),
        rate: ethers.formatUnits(BigInt(response?.rate)?.toString(), 18),
        minDeposit: ethers.formatUnits(response?.minDeposit?.toString(), 18),
        collateralPrice: ethers.formatUnits(response?.collateralPrice?.toString(), 6),
      };

      return dispatch(setCollateral(newResponse));
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

      await descent.approveCollateral!(amount);
      dispatch(setLoadingApproveSupply(false));

      dispatch(setLoadingSupply(true));
      setTimeout(() => {
        dispatch(setLoadingAlert(true));
      }, 2800);
      const response = await descent.depositCollateral(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "deposit",
      });
      _clearInputs();
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      dispatch(setLoadingAlert(false));
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

      setTimeout(() => {
        dispatch(setLoadingAlert(true));
      }, 2800);
      const response = await descent.borrowCurrency(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "borrow",
      });
      _clearInputs();
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      dispatch(setLoadingAlert(false));
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

      setTimeout(() => {
        dispatch(setLoadingAlert(true));
      }, 2800);
      const response = await descent.repayCurrency(amount);

      listener({
        hash: response?.hash,
        amount,
        type: "repay",
      });
      _clearInputs();
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      dispatch(setLoadingAlert(false));
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

      setTimeout(() => {
        dispatch(setLoadingAlert(true));
      }, 2800);

      const response = await descent.withdrawCollateral(amount);

      dispatch(setLoadingAlert(true));
      listener({
        hash: response?.hash,
        amount,
        type: "withdraw",
      });
      _clearInputs();
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      dispatch(setLoadingAlert(false));
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

  const _clearInputs = () => {
    dispatch(setClearInputs(true));

    setTimeout(() => {
      dispatch(setClearInputs(false));
    }, 1000);
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
