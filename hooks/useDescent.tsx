import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import useUserActions from "@/application/user/actions";
import useCollateralActions from "@/application/collateral/actions";
import { availableChains } from "@/config/rainbowkit";

const useDescent = () => {
  const { isDisconnected, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { getVaultInfo, getUsdcBalance } = useUserActions();
  const { getCollateralInfo } = useCollateralActions();

  const [showButton, setShowButton] = useState(false);

  const connectToDescent = async () => {
    getVaultInfo();
    getCollateralInfo();
    getUsdcBalance();
  };

  const setup = () => {
    if (chain) {
      const { id } = chain;
      const isAcceptedChain = availableChains.find((chain) => chain.id === id);

      if (isConnected && !isAcceptedChain) {
        switchNetwork && switchNetwork(availableChains[0].id);
      }

      const show = !isConnected || isDisconnected;
      setShowButton(show);

      if (isConnected && isAcceptedChain) {
        connectToDescent();
      }
    }
  };

  useEffect(() => {
    setup();
  }, [chain, isConnected, isDisconnected]);

  return { showButton };
};

export default useDescent;
