import { useRef, useLayoutEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "./service-card";
import { services } from "./constants";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ExperiencedIn() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollProgress = useMotionValue(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const scrollDistance = track.scrollWidth - viewport.clientWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: "#what-i-do",
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${scrollDistance}`,
          onUpdate: (self) => {
            scrollProgress.set(self.progress);
            setIsScrolling(
              self.isActive || (self.progress > 0 && self.progress < 1)
            );

            // Update shadows
            setShowLeftShadow(self.progress > 0);
            setShowRightShadow(self.progress < 1);
          },
          onLeave: () => setIsScrolling(false),
          onEnterBack: () => setIsScrolling(true),
        },
      });
    });
    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <div className="w-full h-full text-[#f2f2f2] flex flex-col relative p-6">
      {/* Horizontal Scroll Progress Bar - positioned right under top border */}
      <AnimatePresence>
        {isScrolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 z-20 px-8"
          >
            <div className="h-1 bg-gray-800 rounded-full">
              <ScrollProgress
                progress={scrollProgress}
                className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
                springOptions={{
                  stiffness: 280,
                  damping: 25,
                  restDelta: 0.001,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <button
        type="button"
        className="font-heading text-xl mb-8 text-[#f2f2f2] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
        aria-label="Request Service"
      >
        Experienced In
        <ArrowRight className="w-7 h-7 mb-1" aria-hidden="true" />
      </button>

      {/* Card container viewport with scroll shadows */}
      <div className="flex-1 min-h-0 relative edge-to-edge overflow-hidden">
        {/* Left scroll shadow */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#060010] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            showLeftShadow ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Scrollable viewport (mask) */}
        <div ref={viewportRef} className="w-full h-full overflow-hidden">
          {/* Horizontal track */}
          <div ref={trackRef} className="flex gap-6 h-full w-max px-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                iconBg={service.iconBg}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Right scroll shadow */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#060010] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            showRightShadow ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
