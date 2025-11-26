import { useState } from "react";
import { projects } from "../../constants";
import ProjectCard from "./ProjectCard";
import { AnimatePresence } from "framer-motion";

export default function MobileProjects() {
  const [cards, setCards] = useState(projects);

  const handleSwipe = (direction: "left" | "right") => {
    // Move the first card to the end of the array
    setCards((prev) => {
      const newCards = [...prev];
      const firstCard = newCards.shift();
      if (firstCard) {
        newCards.push(firstCard);
      }
      return newCards;
    });
  };

  return (
    <section
      id="projects-mobile"
      className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-10 left-0 w-full text-center z-20">
        <h2 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          My Projects
        </h2>
        <p className="relative z-10 text-center text-xs text-gray-400 max-w-2xl">
          Browse through my projects and explore their features and
          capabilities.
        </p>{" "}
      </div>

      <div className="relative w-full max-w-xs h-[70vh] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((project, index) => {
            // Only render the top 3 cards for performance and visual stacking
            if (index > 2) return null;

            return (
              <ProjectCard
                key={project.title} // Use title as key to maintain identity
                project={project}
                index={index}
                isFront={index === 0}
                onSwipe={handleSwipe}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-900/20 to-transparent pointer-events-none" />
    </section>
  );
}
