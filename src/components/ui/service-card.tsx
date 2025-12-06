import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

export function ServiceCard({
  icon,
  iconBg,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 min-w-[300px] max-w-[300px] h-full hover:bg-white/10 transition-colors">
      <div
        className={cn(
          "w-12 h-12 md:w-16 md:h-16 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center text-white",
          iconBg
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg md:text-xl xl:text-lg font-medium text-white">
          {title}
        </h4>
        <p className="text-sm md:text-lg xl:text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
