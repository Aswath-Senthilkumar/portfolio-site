import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

interface ParticleSphereProps {
  scenePath?: string;
}

export function ParticleSphere({
  scenePath = "https://jjv5kewiwbig2jji.public.blob.vercel-storage.com/scene-f0f0f0.splinecode",
}: ParticleSphereProps) {
  // const [splineApp, setSplineApp] = useState<Application | null>(null);

  // Function to get zoom level based on screen size
  const getZoomLevel = () => {
    // Check if tablet (768px+) or mobile
    const isTablet = window.innerWidth >= 768;
    return isTablet ? 1.7 : 0.8; // Larger zoom for tablets
  };

  function onLoad(spline: Application) {
    // setSplineApp(spline);

    // Set initial zoom to scaled down level based on current screen size
    const zoomLevel = getZoomLevel();
    spline.setZoom(zoomLevel);
  }

  // // Handle resize for zoom adjustments
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (splineApp) {
  //       const zoomLevel = getZoomLevel();
  //       splineApp.setZoom(zoomLevel);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [splineApp]);

  return (
    <Spline
      scene={scenePath}
      onLoad={onLoad}
      style={{ width: "100%", height: "100%" }}
      onWheel={(e) => e.preventDefault()} // Disable zoom on scroll
    />
  );
}
