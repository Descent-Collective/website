"use client";
import { useAccount, useConnect, useNetwork } from "wagmi";
import Descent from "@descent-protocol/sdk";
import { ethers } from "ethers";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoading, setUser } from ".";
import { CallbackProps } from "../store";
import addresses from "@/config/addresses";

const useUserActions = () => {
  const { dispatch, userState } = useSystemFunctions();
  const { address } = useAccount();
  const { connectors } = useConnect();
  const { chain } = useNetwork();

  const { user } = userState;

  const _descentProvider = async () => {
    try {
      const connector = connectors[3];

      await connector.connect();

      const connectedProvider = await connector.getProvider();
      const descent = await Descent.create("browser", {
        collateral: "USDC",
        ethereum: connectedProvider,
      });

      return descent;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsdcBalance = async (callback?: CallbackProps) => {
    try {
      const usdcAddress = addresses[chain?.id!];
      const ERC20_ABI = [
        "function balanceOf(address owner) view returns (uint256)",
      ];
      const connector = connectors[connectors.length - 1];

      await connector.connect();

      const connectedProvider = await connector.getProvider();

      const contract = new ethers.Contract(
        usdcAddress,
        ERC20_ABI,
        connectedProvider
      );
      const balance = await contract.balanceOf(address);
      console.log(balance);
      return;
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
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

      return dispatch(setUser({ ...vaultInfo, hasSetupVault }));
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    connect,
    getVaultInfo,
    getUsdcBalance,
  };
};

export default useUserActions;
