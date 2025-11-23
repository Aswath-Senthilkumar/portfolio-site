import {
  Code2,
  FileType,
  Atom,
  Zap,
  Globe,
  Bot,
  Cpu,
  Database,
  Container,
  Server,
  CreditCard,
  Users,
} from "lucide-react";
import type { Skill } from "./types";

export const skillRows: Skill[][] = [
  [
    { icon: <Code2 className="w-6 h-6" />, name: "Python" },
    { icon: <FileType className="w-6 h-6" />, name: "TypeScript" },
    { icon: <Atom className="w-6 h-6" />, name: "React" },
    { icon: <Globe className="w-6 h-6" />, name: "Next.js" },
    { icon: <Zap className="w-6 h-6" />, name: "FastAPI" },
    { icon: <Zap className="w-6 h-6" />, name: "Vite" },
  ],
  [
    { icon: <Bot className="w-6 h-6" />, name: "LangChain" },
    { icon: <Bot className="w-6 h-6" />, name: "OpenAI API" },
    { icon: <Bot className="w-6 h-6" />, name: "Hugging Face" },
    { icon: <Cpu className="w-6 h-6" />, name: "OpenCV" },
    { icon: <Database className="w-6 h-6" />, name: "Pinecone" },
    { icon: <Database className="w-6 h-6" />, name: "Prisma" },
  ],
  [
    { icon: <Database className="w-6 h-6" />, name: "PostgreSQL" },
    { icon: <Database className="w-6 h-6" />, name: "MongoDB" },
    { icon: <Container className="w-6 h-6" />, name: "Docker" },
    { icon: <Server className="w-6 h-6" />, name: "Vercel" },
    { icon: <CreditCard className="w-6 h-6" />, name: "Stripe" },
    { icon: <Users className="w-6 h-6" />, name: "Clerk" },
  ],
];
