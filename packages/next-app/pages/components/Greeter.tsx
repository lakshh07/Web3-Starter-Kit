import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import {
  Button,
  Container,
  Flex,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import { greeterAddress } from "../../utils/contractAddress";
import contractAbi from "../../contracts/ABI/Greeter.json";
import truncateMiddle from "truncate-middle";

const Greeter: NextPage = () => {
  const [greet, setGreet] = useState<string>(" ");
  const toast = useToast();

  const { data: fetchData, isFetched } = useContractRead({
    addressOrName: greeterAddress,
    contractInterface: contractAbi,
    functionName: "greet",
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    addressOrName: greeterAddress,
    contractInterface: contractAbi,
    functionName: "setGreeting",
    args: [greet],
  });

  const {
    data: postData,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    write,
  } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: postData?.hash,
  });

  useEffect(() => {
    postIsSuccess && setGreet("");
    isLoading &&
      toast({
        title: "Transaction Sent",
        description: truncateMiddle(postData?.hash || "", 5, 4, "..."),
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

    isSuccess &&
      toast({
        title: "Transaction Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
  }, [isSuccess, isLoading, postIsSuccess, postData, toast]);

  return (
    <>
      <Container
        mb={"5em"}
        border="1px solid #CBD5E0"
        rounded={"10px"}
        p={"2em"}
      >
        <Stack spacing={"1em"} align={"center"}>
          <Flex
            w={"60%"}
            justifyContent={"space-around"}
            mb={"1em"}
            alignItems={"center"}
          >
            <Text fontWeight={"700"}>Greetings: </Text>
            <Skeleton
              isLoaded={isFetched}
              rounded={"30px"}
              h={"20px"}
              w={"150px"}
            >
              <Text>{fetchData && fetchData}</Text>
            </Skeleton>
          </Flex>

          <Input
            mx={"auto"}
            variant={"outline"}
            w={"80%"}
            placeholder="Enter Greetings"
            textAlign={"center"}
            value={greet}
            onChange={(e) => setGreet(e.target.value)}
          />
          <Button
            isLoading={postIsLoading}
            mt={"1em"}
            onClick={() => write && write()}
          >
            Set Greetings
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Greeter;
