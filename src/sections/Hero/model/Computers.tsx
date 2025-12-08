import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
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
  modelPath?: string;
}

const Computers: React.FC<ComputersProps> = ({
  modelPath = "https://jjv5kewiwbig2jji.public.blob.vercel-storage.com/scene.glb",
}) => {
  const computer = useGLTF(modelPath, "/draco/gltf/"); // Point to local draco files
  const ref = useRef<THREE.Group>(null);

  // Set up video texture looping
  // useEffect(() => {
  //   // Create video element
  //   const video = document.createElement("video");
  //   video.src =
  //     "https://jjv5kewiwbig2jji.public.blob.vercel-storage.com/Material.074_30_baseColor.mp4";
  //   video.crossOrigin = "anonymous";
  //   video.loop = true;
  //   video.muted = true;
  //   video.playsInline = true;

  //   // Create video texture
  //   const videoTexture = new THREE.VideoTexture(video);
  //   videoTexture.minFilter = THREE.LinearFilter;
  //   videoTexture.magFilter = THREE.LinearFilter;
  //   videoTexture.format = THREE.RGBAFormat;
  //   videoTexture.colorSpace = THREE.SRGBColorSpace;

  //   console.log("Video texture created:", videoTexture);

  //   // Traverse the model and find materials to apply video texture
  //   const screenMaterials: THREE.MeshStandardMaterial[] = [];
  //   computer.scene.traverse((child) => {
  //     if ((child as THREE.Mesh).isMesh) {
  //       const mesh = child as THREE.Mesh;
  //       const material = mesh.material as THREE.MeshStandardMaterial;

  //       if (material && material.isMaterial) {
  //         // Check if this material's map is null or undefined (video didn't load)
  //         // or if the material name suggests it's the screen material
  //         if (
  //           material.name &&
  //           (material.name.includes("Material.074_30") ||
  //             material.name.includes("screen") ||
  //             material.name.includes("Screen"))
  //         ) {
  //           console.log("Found screen material:", material.name);
  //           screenMaterials.push(material);
  //         }
  //       }
  //     }
  //   });

  //   console.log(`Found ${screenMaterials.length} materials to apply video to`);

  //   // Play the video and then apply texture
  //   video
  //     .play()
  //     .then(() => {
  //       console.log("Video playing successfully");

  //       // Apply texture only after video starts playing
  //       screenMaterials.forEach((material) => {
  //         console.log("Applying video texture to:", material.name);
  //         material.map = videoTexture;
  //         material.emissive = new THREE.Color(0x666666); // Make it slightly emissive
  //         material.emissiveMap = videoTexture;
  //         material.emissiveIntensity = 1.0;
  //         material.needsUpdate = true;
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error playing video:", error);
  //     });

  //   return () => {
  //     video.pause();
  //     video.src = "";
  //     video.load();
  //     videoTexture.dispose();
  //     video.remove();
  //   };
  // }, [computer]);

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
    console.log("🗑️ Pausing and cleaning up GPU resources...");

    try {
      // Clear Three.js cache (textures, geometries, materials)
      THREE.Cache.clear();

      // Note: We don't call loseContext() here because it permanently destroys
      // the WebGL context and prevents re-showing the model when scrolling back.
      // Instead, we rely on hiding the canvas and stopping the render loop.

      console.log("✅ GPU cache cleared, canvas hidden");
    } catch (error) {
      console.warn("⚠️ Error during GPU cleanup:", error);
    }
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
      }
    );

    observer.observe(wrapperElement);

    return () => observer.disconnect();
  }, [disposeGPUResources]);

  return (
    <>
      <CanvasLoader />
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
            <Computers modelPath={modelPath} />
          </Suspense>

          <Preload all />
        </Canvas>
      </motion.div>
    </>
  );
};

export default ComputersCanvas;
