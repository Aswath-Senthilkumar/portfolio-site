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

export const projects = [
    {
      title: "API Canvas - Public API Explorer",
      description:
        "Developed a modern, responsive web application that catalogs and showcases public APIs. Features include intuitive search functionality, advanced filtering by categories, authentication, HTTPS and CORS, detailed API information with usage examples, and user authentication for saving favorite APIs. The app uses a GraphQL API layer over a curated collection of public APIs, providing a seamless browsing experience with pagination and dark/light mode.",
      image: "/images/api-canvas.png",
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "GraphQL",
        "Apollo Client",
        "TailwindCSS",
        "Firebase",
      ],
      links: {
        github: "#",
        demo: "https://api-canvas.vercel.app",
      },
    },
    {
      title: "Image-Based Search and Relevance Optimization",
      description:
        "Designed a machine learning–driven image search system using feature descriptors like Color Moments and ResNet‑1000, extended with Latent Semantic Analysis on the Caltech‑101 dataset. Achieved 92% query accuracy on over 8,000 images and built a custom PageRank-based algorithm with user feedback to optimize search relevance.",
      image: "/images/relevant_image.webp",
      tags: [
        "Python",
        "TorchVision",
        "MongoDB",
        "Latent Semantic Analysis",
        "ResNet",
        "PageRank",
        "Machine Learning",
      ],
      links: {
        github: "https://github.com/Aswath-Senthilkumar/CSE515-Project",
        demo: "#",
      },
    },
    {
      title: "Smart Automated Library Management System",
      description:
        "Designed and developed an intelligent library management system integrating RFID and IoT to automate real‑time book inventory tracking, secure user authentication, and proactive SMS/email alerts for due dates, fines, and availability. The solution also offers multi‑attribute search, personalized reading recommendations based on borrowing history, and seamless online fine payment.",
      image: "/images/library.webp",
      tags: ["IoT", "RFID", "React", "Node.js", "MongoDB", "Python"],
      links: {
        github:
          "https://github.com/Aswath-Senthilkumar/LibraryManagementSystem-main",
        demo: "#",
      },
    },
    // {
    //   title: "Smart Plant Monitoring System",
    //   description:
    //     "Designed and developed a Smart Plant Monitoring System and a Mobile Application leveraging IoT technologies and Arduino Cloud to facilitate efficient plant care and monitoring.",
    //   image: "/images/smart_plant.webp?height=400&width=400",
    //   tags: ["IoT", "Arduino", "C Language", "Mobile App", "DHT22 Sensor"],
    //   links: {
    //     github: "#",
    //     demo: "#",
    //   },
    // },
    // {
    //   title: "Heart Cancer Detection",
    //   description:
    //     "Gathered a dataset of medical images from Kaggle for heart cancer detection. Pre-processed and analyzed the dataset using the Weka tool, employing various machine learning algorithms for classification and predictive modeling.",
    //   image: "/images/heart.webp?height=400&width=400",
    //   tags: [
    //     "Machine Learning",
    //     "Weka",
    //     "Data Analysis",
    //     "Medical Imaging",
    //     "Classification",
    //   ],
    //   links: {
    //     github: "#",
    //     demo: "#",
    //   },
    // },
    {
      title: "Software Bug Severity Detection System",
      description:
        "Developed an advanced bug severity prediction system leveraging RoBERTa transformer embeddings and optimized ML algorithms (Random Forest, SVM, Decision Trees) on Defects4J and Bugs.jar datasets. Improved classification accuracy and triaging efficiency via fine‑tuned models and stratified data preprocessing.",
      image: "/images/bug.webp",
      tags: [
        "Python",
        "RoBERTa",
        "Machine Learning",
        "NLP",
        "Random Forest",
        "SVM",
      ],
      links: {
        github:
          "https://github.com/Aswath-Senthilkumar/software-bug-severity-detection",
        demo: "#",
      },
    },
    {
      title: "Medication Reminder System",
      description:
        "Built an automated healthcare communication platform using Twilio for patient medication reminders. Implemented real-time speech recognition with Google Cloud STT for transcribing patient responses, deployed voice/SMS notifications with intelligent answering machine detection, and stored interaction data in MongoDB. Features include full call recording, live transcription, and a comprehensive call log API for healthcare providers.",
      image: "/images/twilio_reminder.png",
      tags: [
        "Node.js",
        "Express",
        "MongoDB",
        "Twilio API",
        "Google Cloud Speech-to-Text",
        "RESTful API",
        "Healthcare Tech",
      ],
      links: {
        github: "https://github.com/Aswath-Senthilkumar/twilio_reminder",
        demo: "#",
      },
    },
    {
      title: "Scrollytelling with D3.js - Fast Food Industry Evolution",
      description:
        "Developed an interactive data visualization that tells the story of the fast food industry's evolution in America through scroll-based storytelling. The project features ten D3.js-powered charts: timelines, bar chart races, maps, and radar charts - integrated with Scrollama.js for smooth scroll-triggered transitions. Built with vanilla JavaScript, D3.js, and Vite, it emphasizes modular architecture, responsive design, and engaging user interactions like tooltips, zoom, and play/pause controls. Data is sourced from industry statistics, processed in real time, and the project is optimized for modern browsers and mobile devices.",
      image: "/images/scrollytelling.png",
      tags: [
        "D3.js",
        "JavaScript",
        "Vite",
        "Scrollama.js",
        "Data Visualization",
        "Responsive Design",
        "SVG",
      ],
      links: {
        github: "https://github.com/Aswath-Senthilkumar/scrollytelling-with-d3",
        demo: "https://scrollytelling-with-d3.vercel.app/",
      },
    },
  ];