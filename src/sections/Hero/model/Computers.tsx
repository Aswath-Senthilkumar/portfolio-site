import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
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

const Computers: React.FC = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const ref = useRef<THREE.Group>(null);

  // Set up video texture looping
  useEffect(() => {
    // Create video element
    const video = document.createElement("video");
    video.src = "./desktop_pc/textures/Material.074_30_baseColor.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    // Create video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    console.log("Video texture created:", videoTexture);

    // Play the video
    video
      .play()
      .then(() => {
        console.log("Video playing successfully");
      })
      .catch((error) => {
        console.error("Error playing video:", error);
      });

    // Traverse the model and find materials to apply video texture
    let appliedCount = 0;
    computer.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;

        if (material && material.isMaterial) {
          // Log material info for debugging
          if (material.name && material.name.includes("30")) {
            console.log(
              "Found potential screen material:",
              material.name,
              material
            );
          }

          // Check if this material's map is null or undefined (video didn't load)
          // or if the material name suggests it's the screen material
          if (
            material.name &&
            (material.name.includes("Material.074_30") ||
              material.name.includes("screen") ||
              material.name.includes("Screen"))
          ) {
            console.log("Applying video texture to material:", material.name);
            material.map = videoTexture;
            material.emissive = new THREE.Color(0x666666); // Make it slightly emissive
            material.emissiveMap = videoTexture;
            material.emissiveIntensity = 1.0;
            // material.metalness = 1;
            // material.roughness = 0.5;
            material.needsUpdate = true;
            appliedCount++;
          }
        }
      }
    });

    console.log(`Applied video texture to ${appliedCount} materials`);

    return () => {
      video.pause();
      video.src = "";
      video.load();
      videoTexture.dispose();
      video.remove();
    };
  }, [computer]);

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
          zIndex: 20,
          duration: 0,
        },
        0.05
      )
      .to(
        ref.current.rotation,
        {
          y: 0.65,
          x: 0,
          z: 0,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        ref.current.position,
        {
          x: 12.8,
          y: -0.4,
          z: 19,
          ease: "power1.inOut",
        },
        0
      );

    return () => {
      zoomTimeline.kill();
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const { active } = useProgress();

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
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 0], fov: 25 }}
          gl={{
            preserveDrawingBuffer: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <OrbitControls
              enableZoom={false}
              // maxPolarAngle={Math.PI / 2}
              // minPolarAngle={Math.PI / 2}
            />
            <Computers />
          </Suspense>

          <Preload all />
        </Canvas>
      </motion.div>
    </>
  );
};

export default ComputersCanvas;
