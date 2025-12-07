import { lazy, Suspense } from "react";

const ParticleSphere = lazy(() =>
  import("./particle-sphere").then((module) => ({
    default: module.ParticleSphere,
  }))
);

interface LazyParticleSphereProps {
  scenePath?: string;
}

export const LazyParticleSphere = (props: LazyParticleSphereProps) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center"></div>
      }
    >
      <ParticleSphere {...props} />
    </Suspense>
  );
};
