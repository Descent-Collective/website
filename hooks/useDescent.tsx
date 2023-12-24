import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import useUserActions from "@/application/user/actions";
import useCollateralActions from "@/application/collateral/actions";
import { availableChains } from "@/config/rainbowkit";

const useDescent = () => {

  const { getVaultInfo } = useUserActions();
  const { getCollateralInfo } = useCollateralActions();

  const connectToDescent = async () => {
   
      getCollateralInfo();
    
  };

  useEffect(() => {
    connectToDescent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {  };
};

export default useDescent;
