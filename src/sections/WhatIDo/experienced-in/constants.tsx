import type { Service } from "@/constants";
import {
  Sparkles,
  Link,
  BarChart3,
  Cloud,
  Bot,
  Globe,
  FileText,
  Zap,
  Database,
} from "lucide-react";

export const services: Service[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Fullstack Web Apps",
    description: "Scalable React/Next.js applications with robust backends.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Machine Learning",
    description: "Custom GNN & ensemble models for complex predictive tasks.",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Agentic AI Systems",
    description:
      "Orchestrating autonomous multi-agent systems for intelligent automation.",
  },
  {
    icon: <Link className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "API Integration",
    description: "Seamless REST & GraphQL integrations for unified systems.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Database Management",
    description: "Scalable SQL/NoSQL schemas with PostgreSQL & MongoDB.",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Cloud Architecture",
    description: "AWS & Docker microservices with automated CI/CD.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Data Visualization",
    description: "Interactive D3.js dashboards for actionable insights.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "NLP & Text Analysis",
    description: "Transformer-based models for sentiment & classification.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Real-time Systems",
    description: "Voice/SMS automation & WebSocket-based communication.",
  },
];
