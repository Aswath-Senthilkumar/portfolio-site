import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/constants";
import { useLenis } from "@/components/providers/context";

export default function AllProjects() {
  const navigate = useNavigate();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock the body in place while the overlay is open without causing layout
  // shift on close. `overflow: hidden` removes the scrollbar gutter, which
  // reflows the page ~15px and (combined with browser scroll restoration)
  // produces a tiny scroll drift on every back-navigation. The position:fixed
  // technique pins the body at its current scroll position, preserves layout
  // exactly, and we restore scrollY explicitly on cleanup.
  useEffect(() => {
    lenis?.stop();

    const scrollY = window.scrollY;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevLeft = document.body.style.left;
    const prevRight = document.body.style.right;
    const prevWidth = document.body.style.width;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.left = prevLeft;
      document.body.style.right = prevRight;
      document.body.style.width = prevWidth;
      // Restore exactly where the user was — no rounding, no browser nudge.
      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [lenis]);

  // Lenis registers a wheel listener on `window`. Even with lenis.stop(),
  // some versions still preventDefault — which kills the overlay's native
  // overflow-y scrolling. Stopping propagation at the overlay's bubble phase
  // guarantees the event never reaches the window listener, so the browser's
  // native scroll on overflow-y-auto handles the wheel naturally.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const stop = (e: Event) => e.stopPropagation();
    overlay.addEventListener("wheel", stop);
    overlay.addEventListener("touchmove", stop);
    return () => {
      overlay.removeEventListener("wheel", stop);
      overlay.removeEventListener("touchmove", stop);
    };
  }, []);

  const handleBack = () => {
    // If there's a history entry to go back to, use it (preserves underlying
    // Home state). Otherwise, fall back to a direct route to "/".
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      ref={overlayRef}
      className="w-full h-full bg-black overflow-y-auto text-white"
    >
      {/* Sticky top bar with back button */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back to home"
            className="font-heading text-sm tracking-wide inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          All Projects
        </h1>

        {/* 2-column grid; falls to single column under lg breakpoint.
            All cards share the same min-height; descriptions vertically
            center in the leftover space so cards look uniform regardless
            of title/tag/description length differences. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {projects.map((project, i) => (
            <article
              key={i}
              className="bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-xl min-h-[420px]"
            >
              {/* Row 1: square image (left) + title/tags/links (right) */}
              <div className="flex flex-row">
                <div className="w-1/3 aspect-square flex-shrink-0 overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight line-clamp-2">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] bg-white/10 text-white rounded-full border border-white/20 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="px-2.5 py-1 text-[11px] text-white/50">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.links.demo && project.links.demo !== "#" && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.links.github && project.links.github !== "#" && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 border border-white/20 transition-all"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2: description fills remaining card height; vertically
                  centered so short descriptions don't leave dead space at
                  the bottom. Clamped to 5 lines so long descriptions don't
                  push the card past the uniform min-height baseline. */}
              <div className="px-5 md:px-6 pt-3 md:pt-4 pb-5 md:pb-6 flex-1 flex items-center">
                <p className="text-sm text-white/80 leading-relaxed line-clamp-5">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
