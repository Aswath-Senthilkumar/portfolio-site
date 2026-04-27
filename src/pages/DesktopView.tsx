import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Home } from "@/pages/Home";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

// Lazy-load AllProjects — only fetched when user navigates to /projects.
const AllProjects = lazy(() => import("@/pages/AllProjects"));

export default function DesktopView() {
  // Home is rendered unconditionally so it never unmounts. AllProjects is
  // overlaid on top when the route is /projects, then unmounts on back —
  // Home's scroll position, GSAP timelines, 3D model state, etc. all stay
  // intact across the navigation.
  const location = useLocation();
  const isProjectsRoute = location.pathname === "/projects";

  // Disable browser auto-scroll-restoration. Home is always mounted, so we
  // manage scroll state ourselves; letting the browser try to "restore" on
  // history navigation leaves a 1-2px drift each time.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      const prev = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = prev;
      };
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <Home />
      <AnimatePresence>
        {isProjectsRoute && (
          <motion.div
            key="all-projects-overlay"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50"
          >
            <Suspense fallback={null}>
              <AllProjects />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScrollProvider>
  );
}
