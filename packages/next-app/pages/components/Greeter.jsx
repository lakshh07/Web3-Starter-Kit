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
  usePrepareContractWrite,
  useAccount,
} from "wagmi";
import { greeterAddress } from "../../utils/contractAddress";
import contractAbi from "../../contracts/ABI/Greeter.json";

function Greeter() {
  const [greet, setGreet] = useState(" ");
  const [data, setData] = useState();
  const [checker, setChecker] = useState(false);
  const toast = useToast();
  const { isConnected } = useAccount();

  const {
    data: fetchData,
    isFetched,
    isFetching,
  } = useContractRead({
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
        description: postData?.hash,
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

  useEffect(() => {
    setData(fetchData);
    setChecker(true);
  }, [isFetching, isFetched]);

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
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Skeleton
                isLoaded={checker}
                rounded={"30px"}
                h={"20px"}
                w={"150px"}
              >
                <Text>{data}</Text>
              </Skeleton>
            </Flex>
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
            isLoading={postIsLoading || isLoading}
            fontWeight={"700"}
            mt={"1em"}
            onClick={() => write()}
            isDisabled={!isConnected}
          >
            Set Greetings
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default Greeter;
