"use client";
import { useAccount } from "wagmi";
import Descent from "@descent-protocol/sdk";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoading, setUser } from ".";
import { CallbackProps } from "../store";

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();
  const { address, connector: activeConnector } = useAccount();

  const _descentProvider = async () => {
    try {
      if (!activeConnector) return;

      await activeConnector.connect();

      const connectedProvider = await activeConnector.getProvider();
      const descent = await Descent.create("browser", {
        collateral: "USDC",
        ethereum: connectedProvider,
      });

      return descent;
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      await descent.setupVault();

      return;
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
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

      return dispatch(
        setUser({ ...vaultInfo, hasSetupVault, usdcWalletBalance })
      );
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    connect,
    getVaultInfo,
  };
};

export default useUserActions;
