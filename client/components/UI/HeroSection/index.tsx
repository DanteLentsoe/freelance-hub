import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeroSection = () => {
  const route = useRouter();
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1551275073-f8adef647c1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}>
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={
          "linear(to-r, blackAlpha.600, blackAlpha.800, blackAlpha.600)"
        }>
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}>
            Freelance Hub is a platform that allows users (Freelancers) to log
            their projects and clients in one centralized application
          </Text>
          <Stack direction={"row"}>
            <Button
              bg={"blue.400"}
              rounded={"full"}
              onClick={() => {
                route.push("/freelancehub");
              }}
              color={"white"}
              _hover={{ bg: "blue.500" }}>
              Get Started
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}>
              Learn More
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default HeroSection;
