import MagicBento, { type BentoCardProps } from "@/components/ui/MagicBento";
import { Capabilities } from "./capabilities";
import { ExperiencedIn } from "./experienced-in";

import { Scale, ShieldCheck, Zap, Trophy } from "lucide-react";

export default function WhatIDo() {
  const cards: BentoCardProps[] = [
    {
      title: "Scalable",
      description: "Built for high scale",
      label: "Architecture",
      color: "#060010",
      icon: <Scale />,
    },
    {
      title: "Performant",
      description: "Optimized & Responsive",
      label: "Speed",
      color: "#060010",
      icon: <Zap />,
    },
    {
      component: <Capabilities />,
      color: "#060010",
      label: "Tech Stack",
    },
    {
      component: <ExperiencedIn />,
      color: "#060010",
      label: "Services",
    },
    {
      title: "Secure",
      description: "Enterprise-grade protection",
      label: "Safety",
      color: "#060010",
      icon: <ShieldCheck />,
    },
    {
      title: "Impactful",
      description: "Data-driven outcomes",
      label: "Results",
      color: "#060010",
      icon: <Trophy />,
    },
  ];

  return (
    <section
      id="what-i-do"
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center pt-16 px-8 scroll-mt-0"
    >
      <div className="w-full z-10">
        <div className="text-lg md:text-xl flex flex-col items-center text-gray-300">
          <MagicBento
            cards={cards}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={500}
            particleCount={20}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </section>
  );
}
