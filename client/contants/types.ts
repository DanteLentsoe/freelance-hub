import { SetStateAction } from "react";

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface IClient {
  id?: string;
  name: string;
  email: string;
  phone: string;
  clientNote: string;
}

export interface IProject {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: string;
  completed: boolean;
  client?: IClient;
  amount: number;
}

export interface IEventAction {
  target: { value: SetStateAction<string> };
}
