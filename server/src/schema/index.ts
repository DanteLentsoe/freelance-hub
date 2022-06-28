import {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
const { projects, clients, freelancer } = require("../sampleData.js");
import { Client, Projects, Freelancer } from "../contants/types";

const ClientType = new GraphQLObjectType<Client>({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const FreelancerType = new GraphQLObjectType<Freelancer>({
  name: "Freelancer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projectId: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return projects.find(
          (project: Projects) => project.id === parent.projectId
        );
      },
    },
    projects: {
      type: ProjectType,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

const ProjectType = new GraphQLObjectType<Projects>({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((client: Client) => client.id === parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args: Client) {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Client) {
        return clients.find((client: Client) => client.id === args.id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args: Projects) {
        return projects;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Projects) {
        return projects.find((project: Projects) => project.id === args.id);
      },
    },
    freelancer: {
      type: FreelancerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Client) {
        return freelancer.find(
          (freelancer: Freelancer) => freelancer.id === args.id
        );
      },
    },

    freelancers: {
      type: new GraphQLList(FreelancerType),
      resolve(parent, args: Projects) {
        return freelancer;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
