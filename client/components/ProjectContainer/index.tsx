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
  useDisclosure,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { GrInProgress } from "react-icons//gr";
import Fuse from "fuse.js";
import { GET_PROJECTS } from "../../graphql/queries/project";
import { useQuery } from "@apollo/client";
import { IProject } from "../../contants/types";
import Loader from "../UI/Loader";
import { DataFectingErrorSVG } from "../../assets/SVG";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { theme } from "../../utils/theme";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import RemoveProjectModal from "../modals/RemoveProjectModal";

interface ProjectData {
  projects: IProject[];
}

const ProjectWrapper = ({ children }: { children: ReactNode }) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [targetCardName, setTargetCardName] = useState<string>();
  const [idKey, setIDKey] = useState<string>();
  // GET_PROJECT

  const toast = useToast();
  const [query, setQuery] = useState<string>("");
  const route = useRouter();

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
              placeholder="Search Projects"
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
                <Box py={2} key={project.id}>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    textAlign="center"
                    justify="center"
                    spacing={{ base: 4, lg: 10 }}
                    py={10}>
                    <ProjectWrapper>
                      <Box p={3} display={"flex"} marginLeft={"auto"} w="100%">
                        <Button
                          style={{ padding: 10 }}
                          onClick={() => {
                            onOpen();
                            setTargetCardName(project?.name);
                            setIDKey(project?.id);
                          }}>
                          <MdDeleteOutline size={22} />
                        </Button>
                      </Box>

                      <Box py={4} px={12}>
                        <Text fontWeight="500" fontSize="2xl">
                          {project.name}
                        </Text>
                        <HStack justifyContent="center">
                          <Text fontSize="3xl" fontWeight="600"></Text>
                          <Text fontSize="1xl" fontWeight="300">
                            Amount:{" "}
                            {project.amount <= 0 ||
                            project.amount === undefined ||
                            project.amount === null
                              ? "No Payment"
                              : project.amount}
                          </Text>
                          <Text fontSize="3xl" color="gray.500">
                            {project.client?.email}
                          </Text>
                        </HStack>
                      </Box>
                      <VStack py={4} borderBottomRadius={"xl"}>
                        <List spacing={3} textAlign="start" px={12}>
                          <ListItem>
                            <ListIcon as={AiOutlineFundProjectionScreen} />
                            {project.status}
                          </ListItem>
                          <ListItem>
                            <ListIcon as={GrInProgress} />
                            Completed:{" "}
                            {project.completed ? (
                              <ListIcon
                                as={AiFillCheckCircle}
                                color="green.500"
                              />
                            ) : (
                              <ListIcon
                                as={AiFillCloseCircle}
                                color="red.500"
                              />
                            )}
                          </ListItem>
                          <ListItem>
                            {`${project.description.substring(0, 20)}....`}
                          </ListItem>
                        </List>
                        <Box w="80%" pt={7}>
                          <Button
                            w="full"
                            // bg={theme.Color.tertiary}
                            // color={"white"}
                            // _hover={{
                            //   bg: theme.Color.secondary,
                            // }}
                            // boxShadow={
                            //   "0px 1px 25px -5px rgb(143 161 153 / 48%), 0 10px 10px -5px rgb(143 161 153 / 43%)"
                            // }
                            color={theme.Color.tertiary}
                            onClick={() => {
                              route.push(`/projects/${project.id}`);
                            }}>
                            See Details
                          </Button>
                        </Box>
                      </VStack>
                    </ProjectWrapper>
                  </Stack>
                </Box>
              );
            })}
        </SimpleGrid>
      </Container>
      <RemoveProjectModal
        id={idKey as string}
        isOpen={isOpen}
        name={targetCardName as string}
        onClose={onClose}
        onOpen={onOpen}
      />
    </>
  );
};

export default ProjectContainer;
