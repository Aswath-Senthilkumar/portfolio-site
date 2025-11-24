import type { ReactNode } from "react";

export type NavigationItem = {
    name: string;
    link: string;
    mobileLink: string;
};

export const navigationItems: NavigationItem[] = [
    {
        name: "Home",
        link: "#home",
        mobileLink: "#home-mobile"
    },
    {
        name: "What I Do",
        link: "#what-i-do",
        mobileLink: "#what-i-do-mobile"
    },
    {
        name: "Experience",
        link: "#experience",
        mobileLink: "#experience-mobile"
    },
    {
        name: "Skills",
        link: "#skills",
        mobileLink: "#skills-mobile"
    },
    {
        name: "About Me",
        link: "#about-me",
        mobileLink: "#about-me-mobile"
    },
    {
        name: "Contact",
        link: "#contact",
        mobileLink: "#contact"
    }
];

export interface Skill {
  icon: ReactNode;
  name: string;
}

export interface Service {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
}