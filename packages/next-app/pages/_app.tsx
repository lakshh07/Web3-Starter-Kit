import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "../helpers/rainbowSetup";

function MyApp({ Component, pageProps }: AppProps) {
  const appInfo = {
    appName: "🦄Web3 Starter Kit",
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        coolMode
        chains={chains}
        appInfo={appInfo}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
