import { SkillPill } from "./skill-pill";
import { skillRows } from "./constants";
import { useSkillRowAnimation } from "./useSkillRowAnimation";

export function Capabilities() {
  const containerRef = useSkillRowAnimation();

  return (
    <div className="w-full h-full text-[#f2f2f2] flex flex-col">
      <h3 className="font-heading text-xl mb-4 md:mb-0 px-6 pt-6">
        Capabilities
      </h3>

      {/* Skills Pills - 3 rows with horizontal overflow, extending edge-to-edge */}
      <div className="py-6 md:flex-1 flex flex-col gap-6 md:gap-11 md:justify-center mb-6 md:mb-1 relative overflow-hidden w-full">
        {/* Left scroll shadow - always visible */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#060010] to-transparent pointer-events-none z-10" />

        {/* Scrolling content container */}
        <div
          ref={containerRef}
          className="flex flex-col gap-6 md:gap-11 overflow-hidden justify-center w-full"
        >
          {skillRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="skill-row flex gap-3 whitespace-nowrap w-max"
            >
              {/* Duplicate the row content for seamless looping */}
              {[...row, ...row, ...row].map((skill, skillIndex) => (
                <SkillPill
                  key={skillIndex}
                  icon={skill.icon}
                  name={skill.name}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Right scroll shadow - always visible */}
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#060010] to-transparent pointer-events-none z-10" />
      </div>

      {/* Bottom left content */}
      {/* <div className="px-6 pb-6">
        <p className="font-body font-light text-sm text-[#b3b3b3] mb-2">
          Don't see your stack?
        </p>
        <button className="font-heading text-[#f2f2f2] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer">
          Let's Talk
          <ArrowRight className="w-5 h-5 mb-1" />
        </button>
      </div> */}
    </div>
  );
}
