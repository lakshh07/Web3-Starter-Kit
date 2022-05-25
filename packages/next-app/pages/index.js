import Head from "next/head";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { useConnect } from "wagmi";
import Footer from "./components/Footer";
import Greeter from "./components/Greeter";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const { isConnected } = useConnect();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Network Detail",
      description: "use Polygon Mumbai for testing",
      status: "info",
      duration: 6000,
      isClosable: false,
      position: "top",
    });
  }, [toast]);
  return (
    <>
      <Head>
        <title>Web3 Starter Kit</title>
        <meta
          name="description"
          content="A quick starter to build on Ethereum and Polygon! 💜"
        />
        <link rel="icon" href="/unicorn.png" />
        <meta property="og:title" content="Web3 Starter Kit" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://web3starterkit.vercel.app/" />
        <meta
          property="og:image:url"
          content="https://bafybeifacspez7tdlba5auczy5qqpqg3mhyakhorp4jvjesyeiaxn33gwm.ipfs.dweb.link/cover.png"
        />
        <meta
          property="og:description"
          content="A quick starter to build on Ethereum and Polygon! 💜"
        />
      </Head>

      <Navbar />
      <Hero />
      {isConnected && <Greeter />}
      <Footer />
    </>
  );
}
