import { useState } from "react";
import FallingIcons from "@/components/ui/FallingIcons";
import { skillRows } from "@/sections/WhatIDo/capabilities/constants";
import { RotateCcw } from "lucide-react";

export default function SkillBox() {
  // Flatten all skill rows into a single array
  const allSkills = skillRows.flat();
  const [isActivated, setIsActivated] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setIsActivated(false);
    setResetKey((prev) => prev + 1); // Force remount of FallingIcons
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center relative pb-10 px-4">
      {/* Muted background box with inward shadow */}
      <div className="relative w-full max-w-6xl h-[75vh] rounded-3xl bg-gradient-to-br from-slate-600/40 via-slate-800/30 to-slate-900/40 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] border border-white/5">
        {/* Inward glow effect */}
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>

        {/* Reset Button - appears after activation */}
        {isActivated && (
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Can you please put my skills back in place?</span>
          </button>
        )}

        {/* Falling Icons Container */}
        <div className="relative w-full h-full">
          <FallingIcons
            key={resetKey}
            skills={allSkills}
            trigger="click"
            backgroundColor="transparent"
            wireframes={false}
            gravity={1}
            mouseConstraintStiffness={0.2}
            onActivate={() => setIsActivated(true)}
          />
        </div>

        {/* Optional corner accents */}
        {/* <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/30 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500/30 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl"></div> */}

        {/* Interaction hint */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/30 text-lg animate-pulse pointer-events-none">
          Click and drag to interact
        </div>
      </div>
    </div>
  );
}
