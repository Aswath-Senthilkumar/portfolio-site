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
        name: "About",
        link: "#about",
        mobileLink: "#about-mobile"
    },
    {
        name: "Experience",
        link: "#experience",
        mobileLink: "#experience-mobile"
    },
    {
        name: "Projects",
        link: "#projects",
        mobileLink: "#projects-mobile"
    },
    {
        name: "Skills",
        link: "#skills",
        mobileLink: "#skills-mobile"
    },
    {
        name: "Contact",
        link: "#contact",
        mobileLink: "#contact"
    }
];