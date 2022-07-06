import { NavItem } from "./types";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "FreeLance Hub",
    children: [
      {
        label: "FreeLance Hub",
        subLabel: "FreeLance Hub using the Web Application",
        href: "/FreeLanceHub",
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
