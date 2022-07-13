import { gql } from "@apollo/client";

const REMOVE_CLIENT = gql`
  mutation removeClient($id: ID) {
    removeClient(id: $id) {
      id
      name
      email
      phone
      clientNote
    }
  }
`;

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String
    $email: String
    $phone: String
    $clientNote: String
  ) {
    addClient(
      name: $name
      email: $email
      phone: $phone
      clientNote: $clientNote
    ) {
      id
      name
      email
      phone
      clientNote
    }
  }
`;

export { REMOVE_CLIENT, ADD_CLIENT };
