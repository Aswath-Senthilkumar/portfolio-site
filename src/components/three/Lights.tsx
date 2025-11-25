import { useMemo, useRef } from "react";
import { Object3D, SpotLight } from "three";

const Lights = () => {
  const spotLightRef = useRef<SpotLight>(null);

  // Create a target object for the spotlight to look at
  const target = useMemo(() => {
    const t = new Object3D();
    t.position.set(5, -1.5, -10); // Target the computer's position
    return t;
  }, []);

  // Add helper to visualize the light (optional, can be removed later)
  // useHelper(spotLightRef as React.MutableRefObject<SpotLight>, SpotLightHelper, 'cyan');

  return (
    <>
      <primitive object={target} />
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        ref={spotLightRef}
        position={[-20, 20, -10]}
        angle={1.0}
        penumbra={1}
        intensity={4000}
        castShadow
        shadow-mapSize={1024}
        target={target}
      />
      <pointLight intensity={1} />
    </>
  );
};

export default Lights;
