import Header from "./Header";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Greeter from "./components/Greeter";
import { useToast } from "@chakra-ui/react";

export default function Home() {
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
  }, []);
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <Greeter />
      <Footer />
    </>
  );
}
