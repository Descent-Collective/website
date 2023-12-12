import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const availableChains = [baseGoerli];

const { chains, publicClient } = configureChains(availableChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Descent",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const RainbowProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowProvider;
