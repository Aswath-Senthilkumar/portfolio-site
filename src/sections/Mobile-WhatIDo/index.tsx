import MobileMagicBento, {
  type BentoCardProps,
} from "./components/MobileMagicBento";
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
      id="what-i-do-mobile"
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center pt-10 pb-4 px-4 md:pb-16 scroll-mt-0"
    >
      <div className="w-full max-w-7xl mx-auto px-8 mb-8">
        <h2 className="text-2xl md:text-6xl md:pb-12 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          What I Do
        </h2>
      </div>
      <div className="w-full z-10">
        <div className="text-lg md:text-xl flex flex-col items-center text-gray-300">
          <MobileMagicBento
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
