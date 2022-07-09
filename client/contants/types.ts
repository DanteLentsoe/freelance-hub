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
