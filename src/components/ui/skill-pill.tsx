import type { ReactNode } from "react";

interface SkillPillProps {
  icon: ReactNode;
  name: string;
}

export function SkillPill({ icon, name }: SkillPillProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 md:py-4 md:px-6 xl:py-2 xl:px-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="text-gray-300">{icon}</div>
      <span className="text-sm md:text-lg xl:text-sm font-medium text-gray-200">
        {name}
      </span>
    </div>
  );
}
