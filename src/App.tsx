import { useState, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Routes, Route } from "react-router";
// import { Home } from "@/pages/Home";
// import { MobileHome } from "@/pages/MobileHome";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { GlobalDrawer } from "@/components/drawer/global-drawer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SEO } from "@/components/seo/SEO";
import {
  getPersonStructuredData,
  getWebSiteStructuredData,
} from "@/utils/structured-data";

const Home = lazy(() =>
  import("@/pages/Home").then((module) => ({ default: module.Home }))
);
const MobileHome = lazy(() =>
  import("@/pages/MobileHome").then((module) => ({
    default: module.MobileHome,
  }))
);

function MobileView() {
  return (
    <Routes>
      <Route path="/" element={<MobileHome />} />
    </Routes>
  );
}

function DesktopView() {
  return (
    <SmoothScrollProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </SmoothScrollProvider>
  );
}

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    // Preload logic if needed
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
        <Suspense fallback={null}>
          {isMobile ? <MobileView /> : <DesktopView />}
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
