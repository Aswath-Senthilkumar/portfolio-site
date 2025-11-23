import type { Service } from "./types";
import {
  Sparkles,
  Link,
  Brain,
  BarChart3,
  Smartphone,
  Cloud,
  Database,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

export const services: Service[] = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "AI Process Automation",
    description:
      "Build custom LLM solutions and workflows to eliminate repetitive tasks and boost productivity.",
  },
  {
    icon: <Link className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "API Integration Solutions",
    description:
      "Connect your systems seamlessly—from Xero to Shopify, payroll to banking, eliminating manual workflows.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Intelligence Dashboards",
    description:
      "Transform scattered data into actionable insights with self-service analytics and custom reporting.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Predictive Analytics Models",
    description:
      "Forecast cash flow and business trends using machine learning on your Xero and CRM data.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Mobile App Development",
    description:
      "Launch your MVP with React Native and Expo, including app store submission and optimisation.",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Cloud Cost Optimisation",
    description:
      "Analyse and reduce AWS/Azure/GCP spend by 20-40% through serverless migration and smart scaling.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Data Modernisation",
    description:
      "Migrate from legacy systems to BigQuery or Snowflake with cost-optimised ETL pipelines.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "Conversion Optimisation",
    description:
      "Boost sales through funnel analytics,\nA/B testing, and Core Web Vitals performance improvements.",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    iconBg: "bg-black/20 border border-[#353739]",
    title: "SaaS Spend Governance",
    description:
      "Discover and optimise your 139+ software subscriptions, eliminating waste and negotiating better deals.",
  },
];
