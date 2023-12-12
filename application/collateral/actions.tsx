"use client";
import { useConnect } from "wagmi";
import Descent from "@descent-protocol/sdk";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setCollateral, setLoading } from ".";
import { CallbackProps } from "../store";

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { connectors } = useConnect();

  const _descentProvider = async () => {
    try {
      const connector = connectors[3];

      await connector.connect();

      const connectedProvider = await connector.getProvider();
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

  return {
    getCollateralInfo,
  };
};

export default useCollateralActions;
