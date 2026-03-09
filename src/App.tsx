import { useState, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
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
import HeroSkeleton from "@/components/ui/HeroSkeleton";

const DesktopView = lazy(() => import("@/pages/DesktopView"));
const MobileView = lazy(() => import("@/pages/MobileView"));

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    // Preload logic: Start fetching heavy assets immediately
    const preloadAssets = async () => {
      try {
        // Preload the main 3D model
        useGLTF.preload("/desktop_pc/scene.compressed.glb");

        // Preload code chunks
        const desktopPromise = import("@/pages/DesktopView");
        const mobilePromise = import("@/pages/MobileView");

        await Promise.all([desktopPromise, mobilePromise]);
      } catch (error) {
        console.error("Preload error:", error);
      }
    };

    preloadAssets();
  }, []);

  return (
    <div className="dark min-h-screen bg-black text-white overflow-hidden">
      <SEO
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [getPersonStructuredData(), getWebSiteStructuredData()],
        }}
      />
      {!animationComplete ? (
        <LoadingAnimation onComplete={() => setAnimationComplete(true)} />
      ) : (
        <Suspense fallback={<HeroSkeleton />}>
          {isMobile ? (
            <MobileView key="mobile-view" />
          ) : (
            <DesktopView key="desktop-view" />
          )}
        </Suspense>
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
