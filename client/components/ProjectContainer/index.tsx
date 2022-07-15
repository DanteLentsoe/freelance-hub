import { ReactNode, SetStateAction, useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useToast,
  Container,
  SimpleGrid,
  Center,
  InputGroup,
  InputRightElement,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Fuse from "fuse.js";
import { GET_PROJECT, GET_PROJECTS } from "../../graphql/queries/project";
import { useQuery } from "@apollo/client";
import { IProject } from "../../contants/types";
import Loader from "../UI/Loader";
import { DataFectingErrorSVG } from "../../assets/SVG";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

interface ProjectData {
  projects: IProject[];
}

const PriceWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}>
      {children}
    </Box>
  );
};

const ProjectContainer = () => {
  const { data, loading, error } = useQuery<ProjectData>(GET_PROJECTS);

  // GET_PROJECT

  const toast = useToast();
  const [query, setQuery] = useState<string>("");

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

  console.log("DAta ", data?.projects);
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setQuery(event.target.value);

  const options = {
    includeScore: true,
    keys: ["name", "email"],
  };

  const projectsData = data && data?.projects;

  const fuse = new Fuse(projectsData as readonly IProject[], options);

  //query results
  const results = fuse.search(query);

  const projectResults = query
    ? results.map((projects) => projects.item)
    : projectsData;

  return (
    <>
      <Stack spacing={4}>
        <Center>
          <InputGroup w={300} marginBottom={10} top={5}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon fontSize={20} />}
            />
            <Input
              value={query}
              onChange={handleChange}
              placeholder="Search Clients"
              size="lg"
              w={300}
              boxShadow={"md"}
            />
            {query.length > 0 && (
              <InputRightElement
                // eslint-disable-next-line react/no-children-prop
                children={
                  <CloseIcon
                    fontSize={15}
                    color={"gray"}
                    onClick={() => {
                      setQuery("");
                    }}
                    _hover={{
                      cursor: "pointer",
                    }}
                  />
                }
              />
            )}
          </InputGroup>
        </Center>
      </Stack>
      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {projectResults &&
            projectResults.map((project: IProject) => {
              return (
                <Box py={12} key={project.id}>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    textAlign="center"
                    justify="center"
                    spacing={{ base: 4, lg: 10 }}
                    py={10}>
                    <PriceWrapper>
                      <Box py={4} px={12}>
                        <Text fontWeight="500" fontSize="2xl">
                          {project.name}
                        </Text>
                        <HStack justifyContent="center">
                          <Text fontSize="3xl" fontWeight="600">
                            $
                          </Text>
                          <Text fontSize="5xl" fontWeight="900">
                            {project.amount}
                          </Text>
                          <Text fontSize="3xl" color="gray.500">
                            {project.client?.email}
                          </Text>
                        </HStack>
                      </Box>
                      <VStack py={4} borderBottomRadius={"xl"}>
                        <List spacing={3} textAlign="start" px={12}>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {project.description}
                          </ListItem>

                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {project.status}
                          </ListItem>
                        </List>
                        <Box w="80%" pt={7}>
                          <Button w="full" colorScheme="red" variant="outline">
                            {project.completed}
                          </Button>
                        </Box>
                      </VStack>
                    </PriceWrapper>
                  </Stack>
                </Box>
              );
            })}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ProjectContainer;