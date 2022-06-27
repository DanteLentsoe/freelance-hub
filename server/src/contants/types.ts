export interface Projects {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: string;
  completed: boolean;
  client?: Client;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}
