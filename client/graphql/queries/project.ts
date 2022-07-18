import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      completed
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID) {
    project(id: $id) {
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

export { GET_PROJECTS, GET_PROJECT };
