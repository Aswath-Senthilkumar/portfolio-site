import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { projects } from "../../../constants";
import { ProjectCard } from "./project-card";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_PROJECTS = 4;
const visibleProjects = projects.slice(0, VISIBLE_PROJECTS);

export const HorizontalCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector(
      ".projects-carousel"
    ) as HTMLElement;
    const section = document.querySelector("#projects") as HTMLElement;

    if (!carousel || !section) return;

    const cards = carousel.querySelectorAll(".project-card");

    // Total horizontal scroll = carousel content width minus the visible
    // area (the overflow-hidden parent, which clips to the frame's width).
    // Using window.innerWidth here would over-scroll on viewports wider than
    // the max-w-7xl frame and leave the last card clipped on the right.
    const visibleWidth =
      carousel.parentElement?.clientWidth ?? window.innerWidth;
    const totalWidth = carousel.scrollWidth - visibleWidth;

    // Create horizontal scroll animation with onUpdate for dynamic scaling
    gsap.to(carousel, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: "#projects",
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;

          // Calculate which card should be centered at current scroll progress
          const currentCenterCard = progress * (totalCards - 1);

          // Update scale and z-index for each card based on distance from center
          cards.forEach((card, index) => {
            const distanceFromCenter = Math.abs(index - currentCenterCard);

            // Scale based on distance: center = 1.1, far = 0.85
            let scale = 1.1 - distanceFromCenter * 0.25;
            scale = Math.max(0.85, Math.min(1.1, scale));

            // z-index: card closest to center gets highest
            const zIndex = distanceFromCenter < 0.5 ? 10 : 1;

            gsap.set(card, { scale, zIndex });
          });
        },
      },
    });

    // Set initial states
    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, {
          scale: 1.1,
          zIndex: 10,
        });
      } else {
        gsap.set(card, {
          scale: 0.85,
          zIndex: 1,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full flex-1 flex items-center justify-center relative">
      {/* Frame enclosing the carousel */}
      <div className="relative w-full max-w-7xl h-[70vh] perspective-1000">
        {/* Decorative Frame */}
        <div className="absolute inset-0 border-4 border-white/10 rounded-3xl pointer-events-none z-20 shadow-[inset_0_0_100px_rgba(255,255,255,0.03)]">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-purple-500/50 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500/50 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500/50 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-purple-500/50 rounded-br-2xl"></div>
        </div>

        {/* Carousel Container */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div
            className="projects-carousel absolute top-0 left-0 h-full flex items-center gap-12"
            style={{
              // Symmetric padding so the first and last cards center
              // horizontally in the frame at scroll start/end. Falls to 0
              // on very wide viewports where the card overflows the frame
              // — in that case the visible (clipped) portion is still
              // centered because pl/pr are equal.
              paddingLeft: "max(0px, calc((100% - 70vw) / 2))",
              paddingRight: "max(0px, calc((100% - 70vw) / 2))",
            }}
          >
            {visibleProjects.map((project, index) => (
              <div key={index} className="project-card">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  links={project.links}
                />
              </div>
            ))}

            {/* 5th slot — "View all" CTA card. Same shape as project cards so
                the carousel scroll naturally lands on it after the 4th card
                and the GSAP scale-on-center logic treats it like the rest. */}
            <div className="project-card">
              <div className="relative w-[70vw] h-[60vh] bg-gradient-to-br from-purple-900/40 via-slate-900/95 to-blue-900/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-6 shadow-2xl flex-shrink-0">
                <h3 className="font-heading text-3xl md:text-5xl text-white text-center px-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  Want to see more?
                </h3>
                <p className="text-white/60 text-base md:text-lg max-w-md text-center px-8">
                  Browse the full collection with detailed descriptions and tech stacks.
                </p>
                <Link
                  to="/projects"
                  className="font-heading text-sm tracking-wide inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white transition-colors shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] mt-2"
                >
                  View all projects
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-sm flex items-center gap-2 z-30 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
          Scroll to explore
        </div>
      </div>
    </div>
  );
};
