import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export function ParticleSphere() {
  // const [splineApp, setSplineApp] = useState<Application | null>(null);

  // Function to get a smaller (scaled-down) zoom level
  const getZoomLevel = () => {
    return 0.8;
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
      scene="/scene-f0f0f0.splinecode"
      onLoad={onLoad}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
