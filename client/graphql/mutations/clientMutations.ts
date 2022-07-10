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

export { REMOVE_CLIENT };
