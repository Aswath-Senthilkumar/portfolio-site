import { useRef, useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "../../../components/ui/service-card";
import { services } from "./constants";
import { gsap } from "gsap";

export function ExperiencedIn() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const row = container.querySelector(".service-row");
    if (!row) return;

    const ctx = gsap.context(() => {
      const totalWidth = row.scrollWidth / 3; // We have 3 copies

      // Move Left: continuous infinite scroll
      gsap.fromTo(
        row,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 30, // Adjust speed as needed
          ease: "none",
          repeat: -1,
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full text-[#f2f2f2] flex flex-col relative p-6">
      {/* Header */}
      <button
        type="button"
        className="font-heading text-xl mb-8 text-[#f2f2f2] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
        aria-label="Request Service"
      >
        Experienced In
        <ArrowRight className="w-7 h-7 mb-1" aria-hidden="true" />
      </button>

      {/* Card container with marquee animation */}
      <div className="flex-1 min-h-0 relative overflow-hidden w-full">
        {/* Left scroll shadow */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#060010] to-transparent pointer-events-none z-10" />

        {/* Scrolling content container */}
        <div
          ref={containerRef}
          className="flex flex-col overflow-hidden w-full h-full"
        >
          <div className="service-row flex gap-6 h-full w-max">
            {/* Duplicate the services 3 times for seamless looping */}
            {[...services, ...services, ...services].map((service, index) => (
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
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#060010] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
