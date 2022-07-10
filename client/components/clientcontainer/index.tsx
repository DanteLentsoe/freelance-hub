/* eslint-disable react/no-children-prop */
import { gql, useQuery } from "@apollo/client";
import {
  Input,
  Center,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IClient } from "../../contants/types";
import { SetStateAction, useState } from "react";
import ClientBox from "../UI/Box";
import Fuse from "fuse.js";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { DataFectingErrorSVG, NoSearchSVG } from "../../assets/SVG";
import Loader from "../UI/Loader";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
      clientNote
    }
  }
`;

interface ClientData {
  clients: IClient[];
}
const ClientsContainer = () => {
  const { data, loading, error } = useQuery<ClientData>(GET_CLIENTS);
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
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setQuery(event.target.value);

  const options = {
    includeScore: true,
    keys: ["name", "email"],
  };

  const clientData = data && data.clients;

  const fuse = new Fuse(clientData as readonly IClient[], options);

  //query results
  const results = fuse.search(query);

  const clientResults = query
    ? results.map((clients) => clients.item)
    : clientData;

  return (
    <>
      <Stack spacing={4}>
        <Center>
          <InputGroup w={300} marginBottom={10} top={5}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
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
      {clientResults && clientResults?.length > 0 ? (
        clientResults.map((client: IClient) => {
          return (
            <>
              <ClientBox {...client} key={client.id} />
            </>
          );
        })
      ) : (
        <>
          <Center>
            <Stack spacing={4}>
              <Text textAlign={"center"}>
                No Results Found for{" "}
                <Text fontStyle={"italic"} fontSize={20}>
                  {query}
                </Text>
              </Text>
              <NoSearchSVG />
            </Stack>
          </Center>
        </>
      )}
    </>
  );
};

export default ClientsContainer;
