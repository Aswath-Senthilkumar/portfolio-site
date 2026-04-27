import { useState, lazy, Suspense, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { GlobalDrawer } from "@/components/drawer/global-drawer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SEO } from "@/components/seo/SEO";
import {
  getPersonStructuredData,
  getWebSiteStructuredData,
} from "@/utils/structured-data";
import { useGLTF } from "@react-three/drei";

const DesktopView = lazy(() => import("@/pages/DesktopView"));
const MobileView = lazy(() => import("@/pages/MobileView"));

function App() {
  const [animationDone, setAnimationDone] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    // Preload code chunks immediately — model preload moved to after LCP
    const preloadChunks = async () => {
      try {
        await Promise.all([
          import("@/pages/DesktopView"),
          import("@/pages/MobileView"),
        ]);
      } catch (error) {
        console.error("Preload error:", error);
      }
    };
    preloadChunks();
  }, []);

  // Start preloading the 3D model immediately. Fonts are already preloaded in
  // index.html with higher priority, so this fetch won't delay text rendering.
  // The loader gates content for ~3s — getting the GLB in flight that whole
  // window means the canvas can render as soon as the loader fades.
  useEffect(() => {
    useGLTF.preload("/desktop_pc/scene.compressed.glb");
  }, []);

  // Unmount overlay from DOM after fade-out completes (400ms)
  useEffect(() => {
    if (animationDone) {
      const t = setTimeout(() => setOverlayMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [animationDone]);

  return (
    <div className="dark min-h-screen bg-black text-white overflow-hidden">
      <SEO
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [getPersonStructuredData(), getWebSiteStructuredData()],
        }}
      />

      {/* Content renders only when animation done — chunks pre-fetched so mount is instant */}
      {animationDone && (
        <Suspense fallback={null}>
          {isMobile ? (
            <MobileView key="mobile-view" />
          ) : (
            <DesktopView key="desktop-view" />
          )}
        </Suspense>
      )}

      {/* Fixed overlay — fades out when animation completes, then unmounts */}
      {overlayMounted && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            backgroundColor: "black",
            opacity: animationDone ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: animationDone ? "none" : "auto",
          }}
        >
          <LoadingAnimation onComplete={() => setAnimationDone(true)} />
        </div>
      )}

      <GlobalDrawer />
      <Analytics />
      <SpeedInsights />
      <div
        aria-hidden="true"
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          fontFamily: '"Azonix", "Inter"',
        }}
      />
    </div>
  );
}

export default App;
