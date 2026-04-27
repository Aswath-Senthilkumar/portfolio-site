import { useState, lazy, Suspense, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { animate, useMotionValue } from "motion/react";
import { GlobalDrawer } from "@/components/drawer/global-drawer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SEO } from "@/components/seo/SEO";
import {
  getPersonStructuredData,
  getWebSiteStructuredData,
} from "@/utils/structured-data";
import { useGLTF } from "@react-three/drei";
import { useLoaderStore } from "@/stores/loaderStore";

const DesktopView = lazy(() => import("@/pages/DesktopView"));
const MobileView = lazy(() => import("@/pages/MobileView"));

const MIN_LOADER_MS = 2400;
const FADE_MS = 400;

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const setLoaderDone = useLoaderStore((s) => s.setDone);
  const progress = useMotionValue(0);
  const [chunkReady, setChunkReady] = useState(false);
  const [minReached, setMinReached] = useState(false);
  const [overlayPresent, setOverlayPresent] = useState(true);

  // Resolve when the chosen view's chunk is loaded — gates the overlay fade
  // so we never reveal an empty Suspense fallback on slow networks.
  useEffect(() => {
    let cancelled = false;
    const target = isMobile
      ? import("@/pages/MobileView")
      : import("@/pages/DesktopView");
    target
      .then(() => {
        if (!cancelled) setChunkReady(true);
      })
      .catch((err) => console.error("Chunk preload error:", err));
    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  // Preload 3D model — fire-and-forget, doesn't gate the loader.
  useEffect(() => {
    useGLTF.preload("/desktop_pc/scene.compressed.glb");
  }, []);

  // Drive the static loader's percentage. Writes directly to a DOM node
  // outside the React tree so it doesn't trigger any re-renders.
  useEffect(() => {
    const pctEl = document.getElementById("static-loader-pct");
    const controls = animate(progress, 100, {
      duration: MIN_LOADER_MS / 1000,
      ease: "easeInOut",
    });
    const unsub = progress.on("change", (v) => {
      if (pctEl) pctEl.textContent = Math.min(100, Math.round(v)).toString();
    });
    const t = window.setTimeout(() => setMinReached(true), MIN_LOADER_MS);
    return () => {
      controls.stop();
      unsub();
      window.clearTimeout(t);
    };
  }, [progress]);

  // Both gates passed → fade and remove the static loader, signal hero to animate.
  useEffect(() => {
    if (!chunkReady || !minReached) return;
    const overlayEl = document.getElementById("static-loader-overlay");
    if (!overlayEl) {
      setLoaderDone();
      setOverlayPresent(false);
      return;
    }
    overlayEl.classList.add("is-fading");
    setLoaderDone();
    const t = window.setTimeout(() => {
      overlayEl.remove();
      setOverlayPresent(false);
    }, FADE_MS);
    return () => window.clearTimeout(t);
  }, [chunkReady, minReached, setLoaderDone]);

  // Lock body scroll while loader is on top — DesktopView mounts immediately
  // underneath so its Lenis instance would otherwise scroll the page silently.
  useEffect(() => {
    if (!overlayPresent) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayPresent]);

  return (
    <div className="dark min-h-screen bg-black text-white overflow-hidden">
      <SEO
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [getPersonStructuredData(), getWebSiteStructuredData()],
        }}
      />

      <Suspense fallback={null}>
        {isMobile ? (
          <MobileView key="mobile-view" />
        ) : (
          <DesktopView key="desktop-view" />
        )}
      </Suspense>

      <GlobalDrawer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
