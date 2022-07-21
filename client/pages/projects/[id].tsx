/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from "next";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar";
import { useRouter } from "next/router";
import { GET_PROJECT } from "../../graphql/queries/project";
import { useQuery } from "@apollo/client/react";
import { IProject } from "../../contants/types";
import { DataFectingErrorSVG } from "../../assets/SVG";
import Loader from "../../components/UI/Loader";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useToast,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import ClientProjectCard from "../../components/clientProjectCard";

interface ISinglProject {
  project: IProject;
}
const SingleProject: NextPage = () => {
  const route = useRouter();

  const { data, loading, error } = useQuery<ISinglProject>(GET_PROJECT, {
    variables: { id: route.query?.id as string },
  });
  const toast = useToast();

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    const toastError = toast({
      title: "Error Screen.",
      description: error.message,
      position: "top",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return (
      <Center>
        <Stack spacing={2}>
          Error {error.message}
          <DataFectingErrorSVG />
        </Stack>
      </Center>
    );
  }

  console.log("Route ", route.query?.id);

  console.log("Inside ", data?.project);
  return (
    <>
      <Head>
        <title>FreeLance Hub | Projects</title>
        <meta
          name="description"
          content="FreeLance Hub projects collection that tracks all your projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <Center py={6}>
        <Box
          maxW={"80%"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}>
          <Box
            h={"60px"}
            bg={useColorModeValue("gray.100", "gray.400")}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}></Box>

          <Stack
            p={3}
            py={3}
            justifyContent={{
              base: "flex-start",
              md: "space-around",
            }}
            direction={{
              base: "column",
              md: "row",
            }}
            alignItems={{ md: "center" }}>
            <Heading size={"lg"} color={"green.500"} letterSpacing={1.1}>
              {data?.project.name as string}
            </Heading>

            <Heading
              // color={useColorModeValue("gray.700", "white")}
              fontSize={"md"}
              fontFamily={"body"}>
              Completed:
            </Heading>
            {data?.project.completed ? (
              <Text>Done</Text>
            ) : (
              <Text>Not Done</Text>
            )}
            <Heading size={"md"}>{"typePlan"}</Heading>
            <Stack>
              <Button size="md">Edit Details</Button>
            </Stack>
          </Stack>

          <Text color={"gray.500"}>{data?.project.description}</Text>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>
                Client : {data?.project.client?.name}
              </Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
          <ClientProjectCard />
        </Box>
      </Center>
    </>
  );
};

export default SingleProject;
