import { useState, useRef } from "react";
import FallingIcons, {
  type FallingIconsRef,
} from "@/components/ui/FallingIcons";
import { skillRows } from "@/sections/WhatIDo/capabilities/constants";
import { RotateCcw } from "lucide-react";

export default function MobileSkillBox() {
  // Flatten all skill rows into a single array
  const allSkills = skillRows.flat();
  const [isActivated, setIsActivated] = useState(false);
  const fallingIconsRef = useRef<FallingIconsRef | null>(null);

  const handleReset = () => {
    // Call the reset function exposed on the FallingIcons component
    if (fallingIconsRef.current) {
      fallingIconsRef.current.resetIcons();
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center relative pb-6 px-3">
      {/* Muted background box with inward shadow - mobile optimized */}
      <div className="relative w-full h-[85vh] rounded-2xl bg-gradient-to-br from-slate-600/40 via-slate-800/30 to-slate-900/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] border border-white/5">
        {/* Inward glow effect */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"></div>

        {/* Reset Button - appears after activation - mobile optimized */}
        {isActivated && (
          <button
            onClick={handleReset}
            className="absolute top-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white text-xs font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <div className="flex flex-col gap-0.5">
              <span>Great job breaking my skills! 🙂</span>
              <span>Can you please put it back in place?</span>
            </div>
          </button>
        )}

        {/* Falling Icons Container */}
        <div className="relative w-full h-full">
          <FallingIcons
            ref={fallingIconsRef}
            skills={allSkills}
            trigger="click"
            backgroundColor="transparent"
            wireframes={false}
            gravity={1}
            mouseConstraintStiffness={0.2}
            onActivate={() => setIsActivated(true)}
            onReset={() => setIsActivated(false)}
            iconSize={45}
          />
        </div>

        {/* Interaction hint - mobile optimized */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/30 text-sm animate-pulse pointer-events-none">
          Tap and drag to interact
        </div>
      </div>
    </div>
  );
}
