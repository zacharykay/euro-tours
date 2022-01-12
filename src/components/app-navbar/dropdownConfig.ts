import { FC } from "react";

// Declare Icons as Variables to avoid spelling errors
export const Settings = 'Settings';
export const GoForward = 'GoForward';
export const GoBack = 'GoBack';
export const User = 'User';
export const Language = 'Language';
export const Map = 'Map';
export const Puzzle = 'Puzzle';
export const Key = "Key";
export const Cart = "Cart";
export const LocationPin = "LocationPin"

interface DropdownItems {
  text?: string;
  menuLink?: string;
  linkIcon?: string;
  secondaryIcon?: string;
  pageLink?: string;
  setActiveMenu?: boolean;
}

interface DropdownSection {
  menuName: string;
  primaryMenu: boolean;
  dropdownItems: DropdownItems[];
}

const primaryMenuName: string = "main";
const submenuNames: any[] = [ "settings", "countries", "cart" ];

export const dropdownMenu: DropdownSection[] = [
  {
    menuName: primaryMenuName,
    primaryMenu: true,
    dropdownItems:
      [
        // {
        //   text: "My Profile (Coming Soon)",
        //   linkIcon: User,
        // },
        {
          text: "Settings",
          menuLink: submenuNames[0],
          linkIcon: Settings,
          secondaryIcon: GoForward,
          setActiveMenu: true,
        },
        {
          text: "Current Countries",
          menuLink: submenuNames[1],
          linkIcon: Map,
          secondaryIcon: GoForward,
          setActiveMenu: true,
        },
        {
          text: "Cart (Coming Soon)",
          linkIcon: Cart,
          setActiveMenu: false
        }
      ],
  },
  {
    //   Must correspond to a submenuName specified above
    menuName: submenuNames[0],
    primaryMenu: false,
    dropdownItems:
      [
        {
          text: "Go Back",
          linkIcon: GoBack,
          menuLink: primaryMenuName,
        },

        {
          text: "Admin Panel",
          linkIcon: Key,
          pageLink: '/admin'
        },
      ],
  },
  {
    //   Must correspond to a specific submenuName
    menuName: submenuNames[1],
    primaryMenu: false,
    dropdownItems:
      [
        {
          text: "Go Back",
          linkIcon: GoBack,
          menuLink: primaryMenuName,
        },

        {
          text: "England",
          linkIcon: LocationPin,
          pageLink: "#",
        },
        {
          text: "France",
          linkIcon: LocationPin,
          pageLink: "#",
        },
        {
          text: "Germany",
          linkIcon: LocationPin,
          pageLink: "#",
        },
        {
          text: "Italy",
          linkIcon: LocationPin,
          pageLink: "#",
        },
        {
          text: "Netherlands",
          linkIcon: LocationPin,
          pageLink: "#",
        },
        {
          text: "Spain",
          linkIcon: LocationPin,
          pageLink: "#",
        }
      ],
  },
];
