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
  Avatar,
  useToast,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

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
          maxW={"445px"}
          w={"full"}
          // bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}>
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}>
            {/* <Image
              src={
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              layout={"fill"}
            /> */}
          </Box>
          <Stack>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}>
              {data?.project.name as string}
            </Text>
            <Heading
              // color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}>
              Completed: {data?.project.completed}
            </Heading>
            <Text color={"gray.500"}>{data?.project.description}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"freelance hub project image"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>
                Client : {data?.project.client?.name}
              </Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default SingleProject;
