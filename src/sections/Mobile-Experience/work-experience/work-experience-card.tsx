import { forwardRef, useState } from "react";
import type { MobileExperienceItem } from "../../../constants";
import { ChevronRight, Wrench, X } from "lucide-react";

interface WorkExperienceCardProps {
  experience: MobileExperienceItem;
  index: number;
}

export const WorkExperienceCard = forwardRef<
  HTMLDivElement,
  WorkExperienceCardProps
>(({ experience }, ref) => {
  const [showTechStack, setShowTechStack] = useState(false);

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden bg-[#060010] border border-[#353739] group transition-all duration-300"
      style={{
        boxShadow: `0 0 40px -10px ${experience.color}20`,
      }}
    >
      {/* Gradient Border Effect */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${experience.color}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-4 md:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:items-center justify-between mb-2 md:mb-4 flex-shrink-0 gap-2 md:gap-4">
          <div className="flex items-center justify-between min-w-full md:w-auto gap-4">
            <h3 className="text-lg md:text-4xl font-bold text-white">
              {experience.company}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTechStack(true);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-gray-300"
              aria-label="View Tech Stack"
            >
              <Wrench className="size-4 md:size-8" />
            </button>
          </div>
          <div className="flex flex-row items-center min-w-full justify-between gap-2 md:gap-4">
            <div className="text-gray-400">
              {/* <Briefcase size={12} className="text-[var(--color-primary)]" /> */}
              <span className="font-medium text-sm md:text-3xl text-[var(--color-primary)]">
                {experience.role}
              </span>
            </div>

            <div className="px-2 py-1 md:py-2 md:px-4 rounded-full bg-white/5 border border-white/10 w-fit">
              {/* <Calendar size={14} className="text-gray-400" /> */}
              <span className="text-xs md:text-2xl text-gray-300 font-mono">
                {experience.period}
              </span>
            </div>
          </div>
        </div>

        {/* Content Frame */}
        <div className="flex-grow relative min-h-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div ref={ref} className="pt-2 px-2 pb-2 overflow-y-auto h-full">
            {/* <p className="text-gray-300 leading-relaxed mb-2 text-base text-sm">
              {experience.description}
            </p> */}

            <div>
              <h4 className="text-sm md:text-3xl uppercase tracking-wider text-gray-500 font-semibold mb-1 md:p-2">
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <ChevronRight
                      className="mt-1 flex-shrink-0 size-4 md:size-7"
                      style={{ color: experience.color }}
                    />
                    <span className="text-sm md:text-3xl">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Popup Overlay */}
      {showTechStack && (
        <div
          className="absolute inset-0 z-50 bg-[#060010]/95 backdrop-blur-sm flex flex-col p-6 md:p-10 animate-in fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-lg md:text-4xl font-bold text-white md:p-2">
              Tech stack
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTechStack(false);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="size-4 md:size-9" />
            </button>
          </div>

          {/* <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">
            Tech stack
          </h4> */}
          <div className="flex flex-wrap gap-2 content-start overflow-y-auto md:mt-4">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 md:py-2 md:px-4 text-sm md:text-2xl rounded-full bg-white/5 border border-white/10 text-gray-200"
                style={{
                  borderColor: `${experience.color}40`,
                  boxShadow: `0 0 10px -5px ${experience.color}20`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Number Watermark */}
      <div
        className="absolute -bottom-10 md:-bottom-20 right-2 md:right-4 text-[120px] md:text-[200px] font-bold opacity-5 pointer-events-none select-none font-heading"
        style={{ color: experience.color }}
      >
        0{experience.id}
      </div>
    </div>
  );
});

WorkExperienceCard.displayName = "WorkExperienceCard";
