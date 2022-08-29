import React, { useEffect } from "react";
import type { NextPage } from "next";
import Header from "./header";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Greeter from "./components/Greeter";
import { useAccount } from "wagmi";
import { Box, useToast } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Network Detail",
      description: "use Polygon Mumbai for testing",
      status: "info",
      duration: 5000,
      isClosable: false,
      position: "bottom-right",
    });
  }, []);

  return (
    <>
      <Box h={"100vh"}>
        <Header />
        <Navbar />
        <Hero />
        {isConnected && <Greeter />}
        <Footer />
      </Box>
    </>
  );
};

export default Home;
