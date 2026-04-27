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
    description: "AI-Powered Drug Repurposing Platform",
    achievements: [
      "Drug repurposing pipelines produced hundreds of GNN-scored candidate pairs with no usable interface for scientists. Built a production analytics dashboard using React, Next.js, and TypeScript, integrating GraphQL with Apollo Client caching to eliminate data over-fetching and reduce retrieval latency by 40%.",
      "High-throughput analytics workloads required sustained concurrency without performance degradation. Engineered Spring Boot backend services containerized with Docker and deployed on Amazon EC2, with horizontal scaling and health-check routing to sustain load without service interruption.",
      "Uptime targets required active visibility into service health across distributed components. Configured Monitoring and Alerting on deployed backend services, enabling early detection of failures and contributing to 99.9% uptime across production workloads.",
      "Batch GNN scoring jobs created unpredictable backend load with no decoupled processing layer. Designed asynchronous workflows to queue and process scoring requests independently of the request cycle, improving system responsiveness and laying the foundation for scalable, distributed job handling across the analytics pipeline.",
      "GNN model outputs had no API surface for downstream consumers. Integrated GNN predictions into backend workflows, persisting versioned results in Amazon S3 and exposing scoring endpoints via AWS Lambda and API Gateway, achieving 85% prediction accuracy across drug-target association tasks.",
      "Collaborated cross-functionally with ML researchers and product stakeholders, shipped production-quality features continuously through CI/CD pipelines via GitHub Actions."
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Spring Boot",
      "Docker",
      "Amazon EC2",
      "AWS Lambda",
      "API Gateway",
      "Amazon S3",
      "GNN",
      "GitHub Actions",
      "CI/CD"
    ],
    color: "#00ffff"
  },
  {
    id: 2,
    company: "CoCreator-AI",
    role: "Fullstack Developer Intern",
    period: "Oct 2024 - Jan 2025",
    description: "B2C SaaS Platform",
    achievements: [
      "Burst traffic exposed silent data loss and inconsistent user state in the persistence layer. Rebuilt Python/Django backend services on Google Cloud Run using Cloud Run with PostgreSQL, integrating Cloud Storage and Pub/Sub for reliable, asynchronous event-driven processing that eliminated data loss under peak load.",
      "Users lacked visibility into their financial data, reducing session depth and retention. Delivered a chat interface and financial analysis dashboard using React, Next.js, and TypeScript backed by structured backend workflows, increasing user engagement by 30% within six weeks of launch.",
      "Planning tasks required manual effort across multiple disconnected tools with no unified output. Orchestrated an LLM-powered workflow engine using LangChain (LangGraph) and OpenAI to parse unstructured user data and generate structured action plans, enabling users to complete planning tasks 67% faster through AI-recommended roadmaps.",
      "API contracts had no automated validation, creating risk of silent regressions during rapid feature delivery. Applied Test-Driven Development (TDD) to validate backend workflows and automated deployments through GitHub Actions CI/CD, supporting rapid iteration across a fast-paced startup release cycle.",
      "Participated in Agile/Scrum sprint planning and ceremonies, coordinating feature delivery across frontend and backend workstreams in close collaboration with the founding team.",
      "Maintained code quality and delivery consistency across a shared codebase by enforcing version control discipline via Git and GitHub, and established test automation practices using Jest to catch regressions before every deployment."
    ],
    technologies: [
      "Python",
      "Django",
      "Google Cloud Run",
      "PostgreSQL",
      "Cloud Storage",
      "Pub/Sub",
      "React",
      "Next.js",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "TDD",
      "GitHub Actions",
      "Jest",
      "Agile/Scrum"
    ],
    color: "#8400ff"
  },
  {
    id: 3,
    company: "Flow AI",
    role: "Fullstack Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    description: "B2B Sales Integration",
    achievements: [
      "Sales data was siloed across disconnected CRM systems with no unified analytics view. Built Node.js and PostgreSQL backend sync workflows integrating Salesforce and HubSpot via REST APIs, improving processing throughput by 33% through Database Design optimization and batched writes.",
      "Sales reps had no way to surface relevant leads across unstructured pipeline data. Built dynamic search and filtering features using React and Next.js, enabling reps to query and discover leads by custom criteria.",
      "Figma designs were inconsistently translated to code, introducing UI drift across product sprints. Delivered pixel-accurate React, Next.js, and TypeScript frontend features through close UI design collaboration, with full Responsive Design and cross-browser coverage, closing design-to-code gaps across three consecutive sprints.",
      "New engineer onboarding stretched to weeks due to undocumented workflows. Led knowledge-transfer sessions and produced Technical Writing to document internal processes using Jira and Confluence in an Agile environment, cutting onboarding time by 40% and improving feature delivery velocity across the team.",
      "Managed feature delivery across the full SDLC from requirements and design through development, testing, and deployment. Used Postman to validate and debug REST API integrations at each stage, ensuring reliable communication between frontend, backend, and third-party CRM systems."
    ],
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Salesforce",
      "HubSpot",
      "REST APIs",
      "React",
      "Next.js",
      "TypeScript",
      "Responsive Design",
      "Jira",
      "Confluence",
      "Postman",
      "Agile",
      "SDLC"
    ],
    color: "#ff0055"
  },
  {
    id: 4,
    company: "Thangamalar & Co",
    role: "Software Engineer",
    period: "Aug 2022 - Jul 2023",
    description: "B2B E-commerce",
    achievements: [
      "Concurrent order updates caused race conditions and slow reads under sustained load. Designed RESTful APIs with Spring Boot, PostgreSQL, and Redis to handle Concurrency and support real-time order processing, applying Caching strategies that cut server latency by 92%.",
      "RBAC enforcement was absent across API surfaces, creating authorization vulnerabilities for multi-role access. Implemented JWT authentication with refresh token workflows and fine-grained role-based access control via Spring Security, enforcing OAuth 2.0-aligned Application Security and Identity Management policies across all API surfaces.",
      "Manual order workflows were unscalable as transaction volume grew. Containerized backend services with Docker and deployed to Amazon EC2, Amazon RDS, and Amazon S3, achieving Scalability through automated end-to-end order processing and cutting completion time by 93% from 15 minutes to 1 minute.",
      "A sluggish legacy frontend was degrading SEO performance and user retention. Rebuilt the storefront as a responsive React and TypeScript web application with Redux state management and Webpack bundle optimization, achieving 0.5s page load times and measurable organic traffic gains.",
      "Manual invoicing consumed significant accounting bandwidth and introduced GST compliance errors. Integrated Razorpay for payment processing and automated GST-compliant invoice generation, reducing accounting effort by 90%.",
      "Post-launch user feedback surfaced recurring pain points in the order tracking and checkout flow. Triaged and resolved reported issues by analyzing root causes across the frontend and backend stack, shipping targeted fixes that reduced support tickets and improved user satisfaction scores."
    ],
    technologies: [
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Spring Security",
      "OAuth 2.0",
      "Docker",
      "Amazon EC2",
      "Amazon RDS",
      "Amazon S3",
      "React",
      "TypeScript",
      "Redux",
      "Webpack",
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
    description: "AI-Powered Drug Repurposing Platform",
    achievements: [
      "Built React/Next.js analytics dashboard with GraphQL + Apollo caching, cutting latency 40%.",
      "Engineered Spring Boot services on Docker + EC2 with horizontal scaling.",
      "Configured monitoring and alerting for 99.9% production uptime.",
      "Designed async workflows decoupling GNN scoring jobs for distributed processing.",
      "Served GNN predictions via AWS Lambda + API Gateway with S3 storage, hitting 85% accuracy.",
      "Shipped features continuously through GitHub Actions CI/CD with ML researchers."
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Spring Boot",
      "Docker",
      "Amazon EC2",
      "AWS Lambda",
      "API Gateway",
      "Amazon S3",
      "GNN",
      "GitHub Actions",
      "CI/CD"
    ],
    color: "#00ffff"
  },
  {
    id: 2,
    company: "CoCreator-AI",
    role: "Fullstack Developer Intern",
    period: "Oct 2024 - Jan 2025",
    description: "B2C SaaS Platform",
    achievements: [
      "Rebuilt Python/Django backend on Cloud Run + PostgreSQL with Cloud Storage and Pub/Sub.",
      "Delivered chat + financial dashboard in React/Next.js, lifting engagement 30% in six weeks.",
      "Orchestrated LLM workflow with LangChain (LangGraph) + OpenAI, cutting planning time 67%.",
      "Applied TDD and GitHub Actions CI/CD across rapid release cycles.",
      "Coordinated Agile/Scrum delivery across frontend/backend with the founding team.",
      "Enforced Git/GitHub discipline and Jest test automation across the codebase."
    ],
    technologies: [
      "Python",
      "Django",
      "Google Cloud Run",
      "PostgreSQL",
      "Cloud Storage",
      "Pub/Sub",
      "React",
      "Next.js",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "TDD",
      "GitHub Actions",
      "Jest",
      "Agile/Scrum"
    ],
    color: "#8400ff"
  },
  {
    id: 3,
    company: "Flow AI",
    role: "Fullstack Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    description: "B2B Sales Integration",
    achievements: [
      "Built Node.js + PostgreSQL sync for Salesforce/HubSpot REST APIs, +33% throughput.",
      "Built React/Next.js search and filtering for surfacing leads across pipeline data.",
      "Delivered pixel-accurate React/Next.js/TypeScript frontends with full responsive coverage.",
      "Documented internal processes in Jira/Confluence, cutting onboarding time 40%.",
      "Managed full-SDLC delivery and validated REST integrations with Postman."
    ],
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Salesforce",
      "HubSpot",
      "REST APIs",
      "React",
      "Next.js",
      "TypeScript",
      "Responsive Design",
      "Jira",
      "Confluence",
      "Postman",
      "Agile",
      "SDLC"
    ],
    color: "#ff0055"
  },
  {
    id: 4,
    company: "Thangamalar & Co",
    role: "Software Engineer",
    period: "Aug 2022 - Jul 2023",
    description: "B2B E-commerce",
    achievements: [
      "Designed Spring Boot/PostgreSQL/Redis APIs with caching, cutting server latency 92%.",
      "Implemented JWT + Spring Security RBAC with OAuth 2.0-aligned access control.",
      "Containerized services on EC2/RDS/S3, cutting order time 93% (15 min → 1 min).",
      "Rebuilt React/TypeScript storefront with Redux + Webpack, hitting 0.5s page loads.",
      "Integrated Razorpay with GST-compliant invoicing, cutting accounting effort 90%.",
      "Triaged post-launch issues across the stack, lifting user satisfaction scores."
    ],
    technologies: [
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Spring Security",
      "OAuth 2.0",
      "Docker",
      "Amazon EC2",
      "Amazon RDS",
      "Amazon S3",
      "React",
      "TypeScript",
      "Redux",
      "Webpack",
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
      image: "/images/api-canvas.webp",
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
        github: "https://github.com/Aswath-Senthilkumar/api-canvas",
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
        github: "https://github.com/Aswath-Senthilkumar/Image-Relevance",
        demo: "#",
      },
    },
    {
      title: "MacBook Pro Landing Page",
      description: "Built an Apple-inspired interactive landing page featuring high-quality 3D MacBook Pro models with smooth scroll animations, dynamic video textures, and real-time customization options including color switching and model size toggling between 14\" and 16\" variants.",
      image: "/images/mac-page.webp",
      tags: [
        "React",
        "Three.js",
        "GSAP",
        "TailwindCSS",
        "WebGL",
        "3D Graphics",
        "Vite",
        "JavaScript"
      ],
      links: {
        github: "https://github.com/Aswath-Senthilkumar/macbook-landing-page",
        demo: "https://macbook-landing-page-theta.vercel.app/"
      }
    },
    {
      title: "Medication Reminder System",
      description:
        "Developed an automated healthcare communication system using Twilio for voice/SMS medication reminders with Google Cloud STT (Speech-to-Text) for real-time transcription. Integrated call recording, live transcription, and a call log API (Application Programming Interface) for healthcare providers with data stored in MongoDB.",
      image: "/images/twilio_reminder.webp",
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
      title: "Scrollytelling with D3.js - Fast Food Industry Evolution",
      description:
        "Created an interactive scrollytelling visualization on the U.S. fast-food industry using D3.js and Scrollama.js with 10 dynamic charts. Built with vanilla JavaScript and Vite for modular, responsive design featuring real-time data processing, tooltips, and smooth scroll-triggered transitions.",
      image: "/images/scrollytelling.webp",
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
    {
  title: "Mini Sudoku (Open Source)",
  description: "Developed a web-based 6×6 Mini Sudoku game inspired by LinkedIn’s version, featuring responsive UI, dark mode, and mobile-optimized gameplay. Implemented backtracking and Fisher–Yates shuffle algorithms for puzzle generation and solving, with Firebase-enabled cloud sync and a modular ES6 architecture tested with Jest (90–100% coverage).",
  image: "/images/sudoku.webp",
  tags: [
    "JavaScript",
    "TailwindCSS v4",
    "Vite",
    "Firebase",
    "ES6 Modules",
    "Jest",
    "Algorithm Design",
    "Game Development"
  ],
  links: {
    github: "https://github.com/gvenugo3/mini-sudoku",
    demo: "https://mini-sudoku-seven.vercel.app/"
  }
},

    {
      title: "D3.js Visualizer",
      description: "An AI-powered D3.js visualization generator that automatically creates interactive data visualizations. Users upload CSV or JSON datasets, and the system uses Google Gemini AI models (with OpenAI fallback) to intelligently select optimal chart types and generate production-ready D3.js code with responsive design, interactive tooltips, smooth animations, and data-driven insights.",
      image: "/images/d3.webp",
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "D3.js",
        "Google Gemini AI",
        "OpenAI",
        "Tailwind CSS",
        "Radix UI",
        "Data Visualization",
        "AI/ML",
        "PapaParse"
      ],
      links: {
        github: "https://github.com/Aswath-Senthilkumar/d3-chart.io",
        demo: "https://d3-chart-io.vercel.app/"
      }
    },
  ];