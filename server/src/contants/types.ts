import { SchemaDefinitionProperty } from "mongoose";

export interface Projects {
  id: string;
  clientId: string | SchemaDefinitionProperty<string>;
  name: string;
  description: string;
  status: string;
  completed: boolean;
  client?: Client;
  amount: number;
}

export interface Client {
  id: string;
  name: string;
  clientNote: string;
  email: string;
  phone: string;
}

export interface Freelancer {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectId: string;
  project?: Projects;
  projects?: Array<Projects>;
}
