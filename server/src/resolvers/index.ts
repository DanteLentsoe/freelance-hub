import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
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
    clientNote: { type: GraphQLString },
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
    // status: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    amount: { type: GraphQLInt },
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
        clientNote: { type: GraphQLString },
      },
      resolve(parent, args: Client) {
        const client = new ClientData({
          name: args.name,
          email: args.email,
          phone: args.phone,
          clientNote: args.clientNote,
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

    // update client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        clientNote: { type: GraphQLString },
      },
      resolve(parent, args: Client) {
        return ClientData.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
              clientNote: args.clientNote,
            },
          },
          { new: true }
        );
      },
    },

    // add project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        // status: {
        //   type: new GraphQLEnumType({
        //     name: "ProjectProgress",
        //     values: {
        //       new: { value: "Not Started" },
        //       pending: { value: "In Progress" },
        //       done: { value: "Completed" },
        //     },
        //   }),
        //   defaultValue: "Not Started",
        // },
        clientId: { type: GraphQLID },
        completed: { type: GraphQLBoolean },
        amount: { type: GraphQLInt },
      },
      resolve(parent, args: Projects) {
        const project = new ProjectData({
          name: args.name,
          description: args.description,
          // status: args.status,
          amount: args.amount,
          completed: args.completed,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    // remove project
    removeProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args: Projects) {
        return ProjectData.findByIdAndRemove(args.id);
      },
    },

    // update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        amount: { type: GraphQLInt },
        // status: {
        //   type: new GraphQLEnumType({
        //     name: "ProjectUpdate",
        //     values: {
        //       new: { value: "Not Started" },
        //       pending: { value: "In Progress" },
        //       done: { value: "Completed" },
        //     },
        //   }),
        // },
      },
      resolve(parent, args: Projects) {
        return ProjectData.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              // status: args.status,
              completed: args.completed,
              amount: args.amount,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
