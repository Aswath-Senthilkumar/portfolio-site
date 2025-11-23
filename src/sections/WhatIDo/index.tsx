import MagicBento, {
  type BentoCardProps,
} from "@/components/animations/MagicBento";
import { Capabilities } from "./components/capabilities";
import { ExperiencedIn } from "./components/experienced-in";

export default function WhatIDo() {
  const cards: BentoCardProps[] = [
    {
      title: "Results",
      description: "Delivering impactful outcomes",
      label: "Impact",
      color: "#060010",
    },
    {
      title: "Secure",
      description: "Enterprise-grade protection",
      label: "Safety",
      color: "#060010",
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
      title: "Fast",
      description: "High-performance solutions",
      label: "Speed",
      color: "#060010",
    },
    {
      title: "Reliable",
      description: "Consistent and dependable",
      label: "Trust",
      color: "#060010",
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
