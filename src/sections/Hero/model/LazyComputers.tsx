import React, { Suspense, lazy } from "react";

// Lazy load the ComputersCanvas component
// We need to modify ComputersCanvas to be the default export of a separate file
// OR we can lazy load the file directly if it already is.
// Computers.tsx exports ComputersCanvas as default.
const ComputersCanvas = lazy(() => import("./Computers"));

interface LazyComputersProps {
  modelPath?: string;
}

const LazyComputers: React.FC<LazyComputersProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          Loading 3D Scene...
        </div>
      }
    >
      <ComputersCanvas {...props} />
    </Suspense>
  );
};

export default LazyComputers;
