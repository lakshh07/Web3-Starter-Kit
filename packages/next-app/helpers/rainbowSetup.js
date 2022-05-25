import { chain, createClient } from "wagmi";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

export const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygonMumbai,
    chain.rinkeby,
    chain.optimism,
    chain.arbitrum,
    chain.polygon,
    chain.localhost,
    chain.hardhat,
  ],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);
const { connectors } = getDefaultWallets({
  appName: "Web3 Starter Kit",
  chains,
});
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
