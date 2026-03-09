import React from "react";

const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-start justify-start pt-32 xl:pt-28 2xl:pt-40 pl-8 md:pl-20 overflow-hidden">
      {/* Skeleton Title */}
      <div className="w-64 h-16 bg-white/5 animate-pulse rounded-lg mb-10" />

      {/* Skeleton Taglines */}
      <div className="space-y-4">
        <div className="w-96 h-6 bg-white/5 animate-pulse rounded" />
        <div className="w-80 h-6 bg-white/5 animate-pulse rounded" />
      </div>

      {/* Skeleton Grid Items */}
      <div className="mt-10 flex gap-4">
        <div className="w-32 h-12 bg-white/5 animate-pulse rounded-xl" />
        <div className="w-32 h-12 bg-white/5 animate-pulse rounded-xl" />
        <div className="w-32 h-12 bg-white/5 animate-pulse rounded-xl" />
      </div>

      {/* Placeholder for the 3D model area */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSkeleton;
