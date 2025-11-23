import React, {
  Suspense,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CanvasLoader from "./Loader";
import Lights from "../../../components/three/Lights";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

interface ComputersProps {
  isMobile: boolean;
}

const Computers: React.FC<ComputersProps> = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const ref = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "+=2000", // Reduced scroll distance
        scrub: 0.5, // Reduced scrub delay for tighter response
        pin: true, // Pin the home section
        // markers: true,
      },
    });

    if (!isMobile) {
      tl.to(
        "#model-container",
        {
          zIndex: 20,
          duration: 0, // Immediate switch
        },
        0.05 // Delay switch to allow interaction at top
      )
        .to(
          ref.current.rotation,
          {
            y: 0.65, // Rotate to face screen flat
            x: 0,
            z: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ref.current.position,
          {
            x: 12.8, // Center horizontally
            y: -0.4, // Center vertically
            z: 19, // Zoom in
            ease: "power1.inOut",
          },
          0
        );
      // .to(
      //   ref.current.scale,
      //   {
      //     x: 3, // Correctly target x, y, z
      //     y: 3,
      //     z: 3,
      //     ease: "power1.inOut",
      //   },
      //   0
      // );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <mesh>
      <Lights />
      <group ref={ref}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.5 : 0.8}
          // position={isMobile ? [0, -3, -2.2] : [2.45, -2.45, -4.5]}
          position={isMobile ? [0, -3, -2.2] : [6, -2, -25]}
          // rotation={[0, -1.55, 0]}
          rotation={[0, -2.2, 0]}
        />
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { active } = useProgress();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <CanvasLoader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="w-full h-full"
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 0], fov: 25 }}
          gl={{ preserveDrawingBuffer: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <OrbitControls
              enableZoom={false}
              // maxPolarAngle={Math.PI / 2}
              // minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} />
          </Suspense>

          <Preload all />
        </Canvas>
      </motion.div>
    </>
  );
};

export default ComputersCanvas;
