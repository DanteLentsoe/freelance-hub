import { gql, useQuery } from "@apollo/client";
import { IClient } from "../../contants/types";

import ClientBox from "../UI/Box";

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
const ClientsContainer = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error {error.message}</p>;
  }

  console.log("DATA ", data);
  return (
    <>
      {data &&
        data.clients.map((client: IClient) => {
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
