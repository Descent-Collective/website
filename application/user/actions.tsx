"use client";
import { useAccount } from "wagmi";
import Descent from "@descent-protocol/sdk";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoading, setLoadingSetup, setUser } from ".";
import { CallbackProps } from "../store";
import { setCollateral } from "../collateral";

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();
  const address = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c'

  const _descentProvider = async () => {
    try {
   
   const descent = await Descent.create("https", {
         collateral: "USDC",
         rpcUrl: process.env.BASE_TESTNET_RPC_URL,
         privateKey: process.env.PRIVATE_KEY,
      });

      return descent;
      
    } catch (error) {
      console.log(error);
    }
  };

  const setupVault = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoadingSetup(true));
      const descent = await _descentProvider();
      await descent.setupVault();

      getVaultInfo();

      return callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingSetup(false));
    }
  };

  const getVaultInfo = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      const vaultInfo = await descent.getVaultInfo(address);
      const hasSetupVault = await descent.getVaultSetupStatus();
      const usdcWalletBalance = await descent.getCollateralTokenBalance(
        address
      );

      const response = { ...vaultInfo, hasSetupVault, usdcWalletBalance };

      return dispatch(setUser(response));
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
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

  return {
    setupVault,
    getVaultInfo,
    getCollateralInfo,
  };
};

export default useUserActions;
