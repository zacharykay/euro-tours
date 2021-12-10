import { FC } from "react";
// import {Settings, GoForward, GoBack, User, Language, Puzzle,} from "../../icons/icons.jsx";

// Declare Icons as Variables to avoid spelling errors
export const Settings = 'Settings';
export const GoForward = 'GoForward';
export const GoBack = 'GoBack';
export const User = 'User';
export const Language = 'Language';
export const Puzzle = 'Puzzle'

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
const submenuNames: any[] = [ "settings", "languages" ];

export const dropdownMenu: DropdownSection[] = [
  {
    menuName: primaryMenuName,
    primaryMenu: true,
    dropdownItems:
      [
        {
          text: "My Profile",
          linkIcon: User,
        },
        {
          text: "Settings",
          menuLink: submenuNames[0],
          linkIcon: Settings,
          secondaryIcon: GoForward,
          setActiveMenu: true,
        },
        {
          text: "Languages",
          menuLink: submenuNames[1],
          linkIcon: Language,
          secondaryIcon: GoForward,
          setActiveMenu: true,
        },
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
          text: "HTML",
          linkIcon: Puzzle,
          pageLink: "#",
        },
        {
          text: "CSS",
          linkIcon: Puzzle,
          pageLink: "#",
        },
        {
          text: "JavaScript",
          linkIcon: Puzzle,
          pageLink: "#",
        },
        {
          text: "React",
          linkIcon: Puzzle,
          pageLink: "#",
        },
        {
          text: "Next.js",
          linkIcon: Puzzle,
          pageLink: "#",
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
          text: "English",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Spanish",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "French",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "German",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Dutch",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Italian",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Russian",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Greek",
          linkIcon: Language,
          pageLink: "#",
        },
        {
          text: "Arabic",
          linkIcon: Language,
          pageLink: "#",
        },
      ],
  },
];
