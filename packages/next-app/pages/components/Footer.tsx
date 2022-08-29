import { Box, Container, Divider, Link, Text } from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <>
      <Box position={"absolute"} bottom={"0"} w={"100%"}>
        <Divider w={"80%"} mx={"auto"} />
        <Container py={"2rem"}>
          <Text textAlign={"center"} fontSize={"1rem"}>
            Build with 💜 by{" "}
            <Link isExternal href="https://twitter.com/LakshayMaini_">
              Lakshay
            </Link>
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
