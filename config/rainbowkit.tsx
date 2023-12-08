import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API}` }),
    publicProvider(),
  ]
);

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
