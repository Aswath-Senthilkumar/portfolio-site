import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import {
  // OrbitControls,
  useGLTF,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CanvasLoader from "./Loader";
import Lights from "../../../components/three/Lights";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

interface ComputersProps {
  modelPath?: string;
}

const Computers: React.FC<ComputersProps> = ({
  modelPath = "/desktop_pc/scene.compressed.glb",
}) => {
  const computer = useGLTF(modelPath, "/draco/gltf/"); // Point to local draco files
  const shadowTexture = useTexture("/shadow.png");
  const ref = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Ensure we start at the top of the page
    window.scrollTo(0, 0);

    // Phase 1 & 2: Model zoom animation (0-50%: top top to center top)
    const zoomTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top", // 0%: Hero at top of viewport
        end: "bottom top", // 50%: Hero completely exited, About fades in
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: () => invalidate(), // Re-render when zooming/rotating model
        // markers: { startColor: "green", endColor: "red", fontSize: "12px" },
      },
    });

    // Phase 3 & 4: Model pinning (stays pinned until wrapper bottom exits)
    // Pin the model so it stays visible, then unpins to scroll out with About
    const pinTrigger = ScrollTrigger.create({
      trigger: "#wrapper",
      start: "top top", // Pin starts when wrapper enters
      end: "bottom bottom", // Unpin when wrapper bottom reaches viewport bottom
      pin: "#model-container",
      pinSpacing: false, // Don't add extra space
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: { startColor: "blue", endColor: "purple", fontSize: "12px" },
    });

    // Mobile check removed, always applying animation

    zoomTimeline
      .to(
        "#model-container",
        {
          zIndex: 1,
          duration: 0,
        },
        0.05,
      )
      .to(
        ref.current.rotation,
        {
          y: 0.65,
          x: 0,
          z: 0,
          ease: "power1.inOut",
        },
        0,
      )
      .to(
        ref.current.position,
        {
          x: 12.8,
          y: -0.4,
          z: 19,
          ease: "power1.inOut",
        },
        0,
      );

    return () => {
      zoomTimeline.kill();
      pinTrigger.kill();
      // Lazy loading
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // Do NOT kill all ScrollTriggers, as this breaks other sections
      // ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [invalidate]);

  return (
    <mesh>
      <Lights />
      <group ref={ref}>
        <primitive
          object={computer.scene}
          scale={0.8}
          // position={isMobile ? [0, -3, -2.2] : [2.45, -2.45, -4.5]}
          position={[6, -2, -25]}
          // rotation={[0, -1.55, 0]}
          rotation={[0, -2.2, 0]}
        />
        {/* Static Baked Shadow */}
        <mesh position={[6, -2.5, -25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      </group>
    </mesh>
  );
};

interface ComputersCanvasProps {
  modelPath?: string;
}

const ComputersCanvas: React.FC<ComputersCanvasProps> = ({ modelPath }) => {
  const { active } = useProgress();
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDisposedRef = useRef(false);
  const [isHidden, setIsHidden] = useState(false);

  // GPU resource disposal function
  const disposeGPUResources = useCallback(() => {
    console.log("🗑️ Pausing 3D render loop...");
    // Purely rely on frameloop="never" to stop GPU usage.
    // Clearing Cache here might cause stutter if synchronous.
  }, []);

  // Monitor wrapper section visibility for cleanup and restoration
  useEffect(() => {
    const wrapperElement = document.getElementById("wrapper");
    if (!wrapperElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting && !isDisposedRef.current) {
          // When wrapper exits viewport, hide and clean up
          console.log("🧹 Wrapper exited viewport - hiding model");
          disposeGPUResources();
          setIsHidden(true);
          isDisposedRef.current = true;
        } else if (entry.isIntersecting && isDisposedRef.current) {
          // When scrolling back, show the model again
          console.log("♻️ Wrapper re-entered viewport - showing model");
          setIsHidden(false);
          isDisposedRef.current = false;
        }
      },
      {
        threshold: 0,
        rootMargin: "100px", // Give 100px buffer before cleanup
      },
    );

    observer.observe(wrapperElement);

    return () => observer.disconnect();
  }, [disposeGPUResources]);

  return (
    <>
      <CanvasLoader />
      {/* 
          We use a div to maintain the DOM structure if needed, 
          but more importantly we conditionally render the Canvas 
          to completely stop the render loop and free up the main thread 
          when the model is not visible.
      */}
      {/* Lazy loading */}
      {/* {!isHidden && ( */}
      <motion.div
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="w-full h-full"
        style={{
          // Hide canvas but maintain layout space for GSAP
          visibility: isHidden ? "hidden" : "visible",
          opacity: isHidden ? 0 : undefined,
        }}
      >
        <Canvas
          flat={true} // Optimization: Use flat tone mapping instead of expensive ACESFilmic Tone Mapping
          frameloop={isHidden ? "never" : "demand"} // Optimization: Stop render loop when hidden
          dpr={1} // Optimization: Cap at 1x scale for performance
          camera={{ position: [0, 0, 0], fov: 25 }}
          gl={{
            preserveDrawingBuffer: false,
            alpha: true,
            antialias: false, // Optimization: Turn off MSAA antialiasing to heavily reduce load
            powerPreference: "high-performance",
          }}
        >
          {/* <Perf position="top-left" /> */}
          <Suspense fallback={null}>
            <Computers modelPath={modelPath} />
          </Suspense>
        </Canvas>
      </motion.div>
      {/* )} */}
    </>
  );
};

export default ComputersCanvas;
