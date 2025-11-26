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
        name: "About Me",
        link: "#about-me",
        mobileLink: "#about-me-mobile"
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

export interface MobileExperienceItem {
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
    role: "Fullstack Developer",
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
    role: "Software Engineer",
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

export const mobileExperienceData: MobileExperienceItem[] = [
  {
    id: 1,
    company: "Vian Analytics",
    role: "Software Engineer",
    period: "Jun 2025 - Present",
    description: "Developing AI-powered drug repurposing platform with GNN models and microservices architecture.",
    achievements: [
      "Built a full-stack drug–cancer prediction platform using Graph Neural Networks and ensemble ML models, achieving 85%+ accuracy and exposing results through RESTful/GraphQL APIs for real-time access.",
      "Designed a scalable microservices architecture with automated ML pipelines for feature engineering, SHAP-based explainability, and biomedical literature integration, ensuring fast and interpretable predictions.",
      "Developed and deployed an interactive analytics dashboard (Next.js/React) and containerized services (Docker + cloud CI/CD), enabling biological network visualization and maintaining high availability with <2s API latency."
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
    role: "Fullstack Developer",
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
    role: "Software Engineer",
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
"Developed a self-serve B2B e-commerce platform replacing manual phone orders, cutting order time from 15 → 2 minutes and tripling daily order capacity.",
"Built a high-performance React + TypeScript SPA (Redux, Webpack), meeting WCAG accessibility standards and reducing page load times to 0.5s.",
"Designed secure Spring Boot REST APIs with JWT/RBAC, Redis caching, and PostgreSQL indexing, improving API latency from 450 ms → 35 ms and deployed via Docker + GitHub Actions with zero downtime.",
"Integrated Razorpay with automated GST-compliant invoicing, reducing manual accounting work by 90% and enabling seamless, secure transactions."
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
        "Developed a responsive web app to explore and manage public APIs, featuring search, category filters, authentication, and API details with examples. Implemented a GraphQL layer over curated APIs for efficient querying, pagination, and personalized browsing.",
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
        "Designed an ML (Machine Learning)–based image search using ResNet-1000 and Color Moments with LSA (Latent Semantic Analysis) on Caltech-101, achieving 92% accuracy and refining relevance via a PageRank-inspired feedback algorithm.",
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
        "Developed an IoT (Internet of Things) and RFID-enabled library management system with real-time tracking, secure authentication, and automated SMS/email alerts. Added multi-attribute search, personalized book recommendations, and online fine payment for seamless user experience.",
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
        "Built a bug severity prediction system using RoBERTa embeddings and optimized ML (Machine Learning) models on Defects4J and Bugs.jar datasets, improving classification accuracy and triage efficiency through fine-tuned training and stratified preprocessing.",
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
        "Developed an automated healthcare communication system using Twilio for voice/SMS medication reminders with Google Cloud STT (Speech-to-Text) for real-time transcription. Integrated call recording, live transcription, and a call log API (Application Programming Interface) for healthcare providers with data stored in MongoDB.",
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
        "Created an interactive scrollytelling visualization on the U.S. fast-food industry using D3.js and Scrollama.js with 10 dynamic charts. Built with vanilla JavaScript and Vite for modular, responsive design featuring real-time data processing, tooltips, and smooth scroll-triggered transitions.",
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