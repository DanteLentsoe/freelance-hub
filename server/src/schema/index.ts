import {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";
const { projects, clients, freelancer } = require("../sampleData.js");
import { Client, Projects, Freelancer } from "../contants/types";

// Mongoose Models
const ClientData = require("../models/Clients");
const ProjectData = require("../models/Projects");

export const ClientType = new GraphQLObjectType<Client>({
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
        return ClientData.findById(parent.clientId);
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
        return ClientData.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Client) {
        return ClientData.findById(args.id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args: Projects) {
        return ProjectData.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Projects) {
        return ProjectData.findById(args.id);
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

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args: Client) {
        const client = new ClientData({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },

    // remove client
    removeClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args: Client) {
        return ClientData.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
