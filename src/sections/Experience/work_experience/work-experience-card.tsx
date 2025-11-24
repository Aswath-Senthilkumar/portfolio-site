import { forwardRef } from "react";
import type { ExperienceItem } from "../../../constants";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

interface WorkExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

export const WorkExperienceCard = forwardRef<
  HTMLDivElement,
  WorkExperienceCardProps
>(({ experience }, ref) => {
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

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-shrink-0">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {experience.company}
            </h3>
            <div className="flex items-center gap-2 text-gray-400">
              <Briefcase size={16} className="text-[var(--color-primary)]" />
              <span className="font-medium text-[var(--color-primary)]">
                {experience.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-sm text-gray-300 font-mono">
              {experience.period}
            </span>
          </div>
        </div>

        {/* Content Frame */}
        <div className="flex-grow relative min-h-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div ref={ref} className="pt-2 px-4 pb-2">
            <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
              {experience.description}
            </p>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Key Achievements
              </h4>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <ChevronRight
                      size={18}
                      className="mt-1 flex-shrink-0"
                      style={{ color: experience.color }}
                    />
                    <span className="text-sm md:text-base">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer / Tech Stack */}
        <div className="mt-auto w-[80%] pt-4 border-t border-white/10 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs md:text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                style={{
                  borderColor: `${experience.color}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Number Watermark */}
      <div
        className="absolute -bottom-10 right-2 text-[120px] font-bold opacity-5 pointer-events-none select-none font-heading"
        style={{ color: experience.color }}
      >
        0{experience.id}
      </div>
    </div>
  );
});

WorkExperienceCard.displayName = "WorkExperienceCard";
