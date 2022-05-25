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
import React, { useState, useEffect } from "react";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { greeterAddress } from "../../utils/contractAddress";
import contractAbi from "../../contracts/ABI/Greeter.json";

function Greeter() {
  const [greet, setGreet] = useState("");
  const toast = useToast();

  const {
    data: fetchData,
    isError: fetchIsError,
    isFetching,
  } = useContractRead(
    {
      addressOrName: greeterAddress,
      contractInterface: contractAbi,
    },
    "greet",
    {
      watch: true,
    }
  );

  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    write,
  } = useContractWrite(
    {
      addressOrName: greeterAddress,
      contractInterface: contractAbi,
    },
    "setGreeting",
    {
      args: [greet],
    }
  );

  const { data, isError, isLoading, isFetched, isSuccess } =
    useWaitForTransaction({
      hash: postData?.hash,
    });

  useEffect(() => {
    postIsSuccess && setGreet("");
    isLoading &&
      toast({
        title: "Transaction Sent",
        description: postData?.hash,
        status: "info",
        duration: 6000,
        isClosable: true,
        position: "top",
      });

    isSuccess &&
      toast({
        title: "Transaction Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
  }, [isSuccess, isLoading, postIsSuccess, setGreet, postData, toast]);

  return (
    <>
      <Container
        mb={"5em"}
        border="1px solid #CBD5E0"
        rounded={"10px"}
        p={"2em"}
        align={"center"}
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
              isLoaded={!isFetching}
              rounded={"30px"}
              h={"20px"}
              w={"150px"}
            >
              <Text>{fetchData}</Text>
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
            fontWeight={"700"}
            mt={"1em"}
            onClick={() => write()}
          >
            Set Greetings
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default Greeter;
