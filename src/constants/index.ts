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


export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    company: "Vian Analytics",
    role: "Software Engineer",
    period: "Jun 2025 - Present",
    description: "Developing AI-powered drug repurposing platform with GNN models and microservices architecture.",
    achievements: [
      "Developed Graph Neural Network (GNN) and ensemble learning models to predict drug–cancer compatibility, achieving over 85% accuracy and exposing predictions via RESTful/GraphQL APIs for real-time access",
      "Engineered a scalable microservices architecture with integrated ML pipelines supporting feature engineering, SHAP-based explainability, and biomedical literature integration",
      "Built an interactive analytics dashboard using Next.js and React, enabling users to explore drug–cancer relationships, visualize biological networks, and interpret AI-generated confidence scores",
      "Deployed containerized microservices using Docker and cloud technologies with automated CI/CD pipelines, ensuring high service availability and sub-2s API response times"
    ],
    technologies: [
      "Python", 
      "PyTorch", 
      "GNN", 
      "Next.js", 
      "React", 
      "Docker", 
      "AWS", 
      "GraphQL", 
      "REST APIs", 
      "Microservices", 
      "ML Pipelines", 
      "SHAP", 
      "CI/CD"
    ],
    color: "#00ffff"
  },
  {
    id: 2,
    company: "CoCreator-AI",
    role: "Fullstack Developer Intern",
    period: "Oct 2024 - Jan 2025",
    description: "Built B2C SaaS platform features leveraging Gemini LLM for personalized business mentoring.",
    achievements: [
      "Built user-facing modules with Gemini LLM to analyze user personality traits and generate tailored business mentoring content, increasing engagement by 30%",
      "Developed Django backend services with LangGraph by LangChain, hosting agentic AI workflows on Google Cloud Run with Cloud Storage and Pub/Sub",
      "Developed an AI-powered dashboard that transformed model outputs into actionable workflows, reducing planning time by 67% for 1,200+ users",
      "Rebuilt the chat interface in Next.js using Flexbox and virtualization, eliminating UI lag and improving real-time responsiveness"
    ],
    technologies: [
      "Django", 
      "Python",
      "LangChain", 
      "LangGraph",
      "Google Cloud Run", 
      "Pub/Sub",
      "Next.js", 
      "React",
      "Gemini LLM",
      "Flexbox"
    ],
    color: "#8400ff"
  },
  {
    id: 3,
    company: "Flow AI",
    role: "Fullstack Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    description: "Developed full-stack features for AI-driven sales platform and optimized integrations.",
    achievements: [
      "Developed full-stack features for an AI-driven sales platform using React, Node.js, and Python, collaborating cross-functionally for end-to-end feature delivery",
      "Integrated Salesforce and HubSpot APIs to optimize data synchronization and frontend responsiveness, reducing backend processing time by 33%",
      "Improved developer onboarding efficiency by 40% through streamlined code reviews, documentation, and automated testing pipelines"
    ],
    technologies: [
      "React", 
      "Node.js", 
      "Python", 
      "Salesforce API", 
      "HubSpot API", 
      "Full-stack Development",
      "API Integration"
    ],
    color: "#ff0055"
  },
  {
    id: 4,
    company: "Thangamalar & Co",
    role: "Software Engineer",
    period: "Aug 2022 - Jul 2023",
    description: "Developed self-serve B2B e-commerce platform transforming manual order processes.",
    achievements: [
      "Developed a self-serve B2B e-commerce platform that replaced manual phone orders, reducing order time from 15 to 2 minutes and tripling daily order handling capacity",
      "Built a scalable React + TypeScript SPA with Redux and Webpack optimization, adhering to WCAG accessibility standards and reducing page load times to 0.5s",
      "Designed Spring Boot REST APIs with JWT/RBAC, Redis caching, and PostgreSQL indexing, improving API latency from 450 ms to 35 ms",
      "Containerized backend services with Docker and automated CI/CD pipelines using GitHub Actions for consistent, zero-downtime deployments",
      "Integrated Razorpay for secure transactions and automated GST-compliant invoicing, cutting manual accounting work by 90%"
    ],
    technologies: [
      "React", 
      "TypeScript", 
      "Redux",
      "Webpack",
      "Spring Boot", 
      "Java",
      "PostgreSQL", 
      "Redis",
      "Docker", 
      "GitHub Actions",
      "JWT/RBAC",
      "Razorpay"
    ],
    color: "#00ff88"
  }
];
