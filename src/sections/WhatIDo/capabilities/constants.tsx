import { Coffee } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiSpringboot,
  SiDjango,
  SiAmazonwebservices,
  SiTailwindcss,
  SiD3Dotjs,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiLangchain,
  SiPandas,
  SiNumpy,
  SiNodedotjs,
  SiReact,
  SiPython,
  SiJavascript,
} from "react-icons/si";
import type { Skill } from "@/constants";

export const skillRows: Skill[][] = [
  [
    { icon: <SiPython className="w-6 h-6" />, name: "Python" },
    { icon: <Coffee className="w-6 h-6" />, name: "Java" },
    { icon: <SiTypescript className="w-6 h-6" />, name: "TypeScript" },
    { icon: <SiReact className="w-6 h-6" />, name: "React" },
    { icon: <SiNextdotjs className="w-6 h-6" />, name: "Next.js" },
    { icon: <SiTailwindcss className="w-6 h-6" />, name: "TailwindCSS" },
    { icon: <SiJavascript className="w-6 h-6" />, name: "JavaScript" },
    { icon: <SiD3Dotjs className="w-6 h-6" />, name: "D3.js" },
  ],
  [
    { icon: <SiPytorch className="w-6 h-6" />, name: "PyTorch" },
    { icon: <SiTensorflow className="w-6 h-6" />, name: "TensorFlow" },
    { icon: <SiScikitlearn className="w-6 h-6" />, name: "Scikit-learn" },
    { icon: <SiLangchain className="w-6 h-6" />, name: "LangChain" },
    { icon: <SiPandas className="w-6 h-6" />, name: "Pandas" },
    { icon: <SiNumpy className="w-6 h-6" />, name: "NumPy" },
  ],
  [
    { icon: <SiNodedotjs className="w-6 h-6" />, name: "Node.js" },
    { icon: <SiSpringboot className="w-6 h-6" />, name: "Spring Boot" },
    { icon: <SiDjango className="w-6 h-6" />, name: "Django" },
    { icon: <SiAmazonwebservices className="w-6 h-6" />, name: "AWS" },
    { icon: <SiDocker className="w-6 h-6" />, name: "Docker" },
    { icon: <SiPostgresql className="w-6 h-6" />, name: "PostgreSQL" },
    { icon: <SiMongodb className="w-6 h-6" />, name: "MongoDB" },
  ],
];
