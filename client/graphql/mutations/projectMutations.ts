import { gql } from "@apollo/client";
const REMOVE_PROJECT = gql`
  mutation removeProject($id: ID) {
    removeProject(id: $id) {
      id
      name
      description
      status
      completed
      amount
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
  mutation AddProject(
    $name: String
    $description: String
    $status: ProjectProgress
    $completed: Boolean
    $clientId: ID
    $amount: Number
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      completed: $completed
      clientId: $clientId
      amount: $amount
    ) {
      id
      name
      description
      status
      completed
      amount
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

export { REMOVE_PROJECT, ADD_PROJECT };
