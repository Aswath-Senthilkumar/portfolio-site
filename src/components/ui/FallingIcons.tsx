import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import Matter from "matter-js";
import type { Skill } from "@/constants";

export interface FallingIconsRef {
  resetIcons: () => void;
}

interface FallingIconsProps {
  skills: Skill[];
  trigger?: "auto" | "scroll" | "click";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  onActivate?: () => void; // Called when animation starts
  onReset?: () => void; // Called when reset animation completes
  iconSize?: number;
}

const FallingIcons = forwardRef<FallingIconsRef, FallingIconsProps>(
  (
    {
      skills,
      trigger = "auto",
      backgroundColor = "transparent",
      wireframes = false,
      gravity = 1,
      mouseConstraintStiffness = 0.2,
      onActivate,
      onReset,
      iconSize = 80,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const iconsContainerRef = useRef<HTMLDivElement | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const originalPositionsRef = useRef<{ x: number; y: number }[]>([]);

    // Refs to store physics objects for cleanup
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const [effectStarted, setEffectStarted] = useState(trigger === "auto");
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
      let cleanup: (() => void) | undefined;

      if (trigger === "auto" && !effectStarted) {
        // Use setTimeout to avoid synchronous state update warning
        const timer = setTimeout(() => setEffectStarted(true), 0);
        cleanup = () => clearTimeout(timer);
      } else if (trigger === "scroll" && containerRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setEffectStarted(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        cleanup = () => observer.disconnect();
      }

      return cleanup;
    }, [trigger, effectStarted]);

    useEffect(() => {
      if (!effectStarted) return;
      onActivate?.();

      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
        Matter;

      const canvasContainer = canvasContainerRef.current;
      const container = containerRef.current;
      if (!container || !canvasContainer) return;

      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      if (width <= 0 || height <= 0) return;

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasContainer,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
        },
      });

      const boundaryOptions = {
        isStatic: true,
        render: { fillStyle: "transparent" },
      };
      const floor = Bodies.rectangle(
        width / 2,
        height + 25,
        width,
        50,
        boundaryOptions
      );
      const leftWall = Bodies.rectangle(
        -25,
        height / 2,
        50,
        height,
        boundaryOptions
      );
      const rightWall = Bodies.rectangle(
        width + 25,
        height / 2,
        50,
        height,
        boundaryOptions
      );
      const ceiling = Bodies.rectangle(
        width / 2,
        -25,
        width,
        50,
        boundaryOptions
      );

      if (!iconsContainerRef.current) return;
      const iconElements =
        iconsContainerRef.current.querySelectorAll(".skill-icon");
      const iconBodies = [...iconElements].map((elem, index) => {
        const rect = elem.getBoundingClientRect();

        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        // Store original positions
        if (originalPositionsRef.current.length <= index) {
          originalPositionsRef.current.push({ x, y });
        }

        const size = iconSize; // Icon body size
        const body = Bodies.rectangle(x, y, size, size, {
          render: { fillStyle: "transparent" },
          restitution: 0.7,
          frictionAir: 0.01,
          friction: 0.3,
          chamfer: { radius: 10 },
        });
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 8,
          y: 0,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

        return { elem, body };
      });

      iconBodies.forEach(({ elem, body }) => {
        (elem as HTMLElement).style.position = "absolute";
        (elem as HTMLElement).style.left = `${
          body.position.x - body.bounds.max.x + body.bounds.min.x / 2
        }px`;
        (elem as HTMLElement).style.top = `${
          body.position.y - body.bounds.max.y + body.bounds.min.y / 2
        }px`;
        (elem as HTMLElement).style.transform = "none";
      });

      // Create mouse constraint
      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false },
        },
      });
      render.mouse = mouse;

      // Track when mouse/touch constraint is actively dragging
      // This allows scrolling when not dragging an icon
      Matter.Events.on(mouseConstraint, "startdrag", () => {
        if (container) {
          container.style.touchAction = "none";
          container.style.overflow = "hidden";
        }
      });

      Matter.Events.on(mouseConstraint, "enddrag", () => {
        if (container) {
          container.style.touchAction = "auto";
          container.style.overflow = "hidden";
        }
      });

      World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
        ceiling,
        mouseConstraint,
        ...iconBodies.map((ib) => ib.body),
      ]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      const updateLoop = () => {
        iconBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          (elem as HTMLElement).style.left = `${x}px`;
          (elem as HTMLElement).style.top = `${y}px`;
          (
            elem as HTMLElement
          ).style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        Matter.Engine.update(engine);
        animationFrameRef.current = requestAnimationFrame(updateLoop);
      };

      // Store refs for cleanup
      engineRef.current = engine;
      runnerRef.current = runner;
      renderRef.current = render;
      mouseConstraintRef.current = mouseConstraint;

      // Store mouse ref for cleanup
      if (renderRef.current) {
        renderRef.current.mouse = mouse;
      }

      updateLoop();

      // 🎯 ADD VIEWPORT-BASED PAUSE/RESUME FOR PERFORMANCE
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry.isIntersecting) {
            // Pause physics simulation when not visible
            console.log("⏸️ FallingIcons not visible - pausing physics");
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
            Runner.stop(runner);
          } else {
            // Resume physics simulation when visible
            console.log("▶️ FallingIcons visible - resuming physics");
            Runner.run(runner, engine);
            if (!animationFrameRef.current) {
              updateLoop();
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      if (container) {
        observer.observe(container);
      }

      return () => {
        // Disconnect observer
        observer.disconnect();

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        // Clean up mouse constraint event listeners
        if (mouseConstraintRef.current) {
          Matter.Events.off(mouseConstraintRef.current, "startdrag");
          Matter.Events.off(mouseConstraintRef.current, "enddrag");
        }

        // Clean up mouse events which might block scrolling/clicking
        if (renderRef.current && renderRef.current.mouse) {
          Matter.Mouse.clearSourceEvents(renderRef.current.mouse);
        }

        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasContainer) {
          canvasContainer.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);

        // Reset container styles to ensure scrolling works
        if (container) {
          container.style.touchAction = "auto";
          container.style.overflow = "hidden";
        }

        // Clear refs
        engineRef.current = null;
        runnerRef.current = null;
        renderRef.current = null;
        mouseConstraintRef.current = null;
        animationFrameRef.current = null;
      };
    }, [
      effectStarted,
      gravity,
      wireframes,
      backgroundColor,
      mouseConstraintStiffness,
      onActivate,
      iconSize,
    ]);

    const handleTrigger = () => {
      if (!effectStarted && trigger === "click") {
        setEffectStarted(true);
      }
    };

    const handleReset = useCallback(() => {
      if (!iconsContainerRef.current || !effectStarted || isResetting) return;

      console.log("Resetting icons...");
      setIsResetting(true);

      // Clean up mouse constraint event listeners FIRST
      if (mouseConstraintRef.current) {
        Matter.Events.off(mouseConstraintRef.current, "startdrag");
        Matter.Events.off(mouseConstraintRef.current, "enddrag");
      }

      // Clean up mouse events to prevent interference
      if (renderRef.current && renderRef.current.mouse) {
        Matter.Mouse.clearSourceEvents(renderRef.current.mouse);
      }

      // CRITICAL: Reset container styles for touch events on mobile
      if (containerRef.current) {
        const container = containerRef.current;
        // Reset touch-action to ensure mobile touches work
        container.style.touchAction = "auto";
        (
          container.style as unknown as Record<string, string>
        ).webkitTouchCallout = "default";
        (
          container.style as unknown as Record<string, string>
        ).webkitUserSelect = "auto";
      }

      // Stop the physics simulation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }

      const iconElements =
        iconsContainerRef.current.querySelectorAll(".skill-icon");

      if (iconElements.length === 0) {
        // Fallback if no icons found
        setIsResetting(false);
        setEffectStarted(false);
        onReset?.();
        return;
      }

      // Calculate total animation time
      const staggerDelay = 80;
      const transitionDuration = 600;
      const totalDuration =
        (iconElements.length - 1) * staggerDelay + transitionDuration + 100;

      // Schedule state reset guaranteed
      setTimeout(() => {
        console.log("Reset complete, setting effectStarted to false");

        // Reset container styles to ensure next click works
        if (containerRef.current) {
          containerRef.current.style.touchAction = "auto";
          containerRef.current.style.overflow = "hidden";
        }

        setIsResetting(false);
        setEffectStarted(false);
        onReset?.();
      }, totalDuration);

      // Animate each icon back to its original position with stagger
      iconElements.forEach((elem, index) => {
        const htmlElem = elem as HTMLElement;
        const originalPos = originalPositionsRef.current[index];

        if (!originalPos) return;

        setTimeout(() => {
          // Set transition for smooth animation
          htmlElem.style.transition = `all ${transitionDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
          htmlElem.style.position = "absolute";
          htmlElem.style.left = `${originalPos.x}px`;
          htmlElem.style.top = `${originalPos.y}px`;
          htmlElem.style.transform = "translate(-50%, -50%) rotate(0rad)";

          // Reset transition after animation completes
          setTimeout(() => {
            htmlElem.style.transition = "";
          }, transitionDuration);
        }, index * staggerDelay);
      });
    }, [effectStarted, isResetting, onReset]);

    // Expose reset function via ref using useImperativeHandle
    useImperativeHandle(
      ref,
      () => ({
        resetIcons: handleReset,
      }),
      [handleReset]
    );

    return (
      <div
        ref={containerRef}
        className="relative z-[1] w-full h-full overflow-hidden"
        style={{ touchAction: "auto" }}
      >
        {/* Trigger Overlay - Ensures click is captured on mobile */}
        {!effectStarted && trigger === "click" && (
          <div
            className="absolute inset-0 z-[100] cursor-pointer bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Overlay clicked, triggering effect");
              handleTrigger();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Overlay touched, triggering effect");
              handleTrigger();
            }}
            style={{
              touchAction: "auto",
              WebkitTapHighlightColor: "transparent",
            }}
          />
        )}

        <div
          ref={iconsContainerRef}
          className="relative w-full h-full flex flex-col items-center justify-start pt-12"
          style={{ pointerEvents: effectStarted ? "auto" : "none" }}
        >
          {/* Main skills grid */}
          <div className="flex flex-wrap justify-center items-start gap-8 mb-8">
            {skills.map((skill, index) => {
              const isCompact = iconSize < 60;
              return (
                <div
                  key={index}
                  className={`skill-icon flex flex-col items-center justify-center ${
                    isCompact
                      ? "p-1 rounded-lg bg-slate-700/80"
                      : "gap-2 p-4 bg-slate-700/60 rounded-xl"
                  } backdrop-blur-sm border border-white/10 shadow-lg`}
                  style={
                    isCompact
                      ? { width: iconSize, height: iconSize }
                      : { minWidth: iconSize, minHeight: iconSize }
                  }
                >
                  <div
                    className={`${
                      isCompact
                        ? "text-cyan-300 scale-100"
                        : "text-cyan-400 scale-150"
                    }`}
                  >
                    {skill.icon}
                  </div>
                  {!isCompact && (
                    <span className="text-xs text-white/80 font-medium whitespace-nowrap">
                      {skill.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
      </div>
    );
  }
);

FallingIcons.displayName = "FallingIcons";

export default FallingIcons;
