import { gql, useQuery } from "@apollo/client";
import { Input, Center } from "@chakra-ui/react";
import { IClient } from "../../contants/types";
import { SetStateAction, useState } from "react";
import ClientBox from "../UI/Box";
import Fuse from "fuse.js";

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
  const [query, setQuery] = useState<string>("");

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error {error.message}</p>;
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
      <Center>
        <Input
          value={query}
          onChange={handleChange}
          placeholder="Search Clients"
          size="lg"
          w={300}
          marginBottom={10}
          top={5}
          boxShadow={"md"}
        />
      </Center>

      {clientResults &&
        clientResults.map((client: IClient) => {
          return (
            <>
              <ClientBox {...client} key={client.id} />
            </>
          );
        })}
    </>
  );
};

export default ClientsContainer;
