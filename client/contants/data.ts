import { NavItem } from "./types";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "FreeLance Hub",
    children: [
      {
        label: "FreeLance Hub",
        subLabel: "FreeLance Hub using the Web Application",
        href: "/freelancehub",
      },
      {
        label: "FreeLance Hub Projects",
        subLabel: "Collection of Projects",
        href: "/freelanceprojects",
      },
    ],
  },

  {
    label: "About",
    href: "/learnmore",
  },
  {
    label: "Contact Developer",
    href: "/contact",
  },
];
