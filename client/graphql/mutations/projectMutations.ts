import { gql } from "@apollo/client";
const REMOVE_PROJECT = gql`
  mutation removeProject($id: ID) {
    removeProject(id: $id) {
      id
      name
      description
      status
      completed

      client {
        id
        name
        email
        phone
        clientNote
      }
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String
    $description: String
    $status: String
    $completed: String
  ) {
    addClient(
      name: $name
      description: $description
      status: $status
      completed: $completed
    ) {
      id
      name
      description
      status
      completed
    }
  }
`;

export { REMOVE_PROJECT, ADD_PROJECT };
