import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import type { Skill } from "@/constants";

interface FallingIconsProps {
  skills: Skill[];
  trigger?: "auto" | "scroll" | "click";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  onActivate?: () => void; // Called when animation starts
}

const FallingIcons: React.FC<FallingIconsProps> = ({
  skills,
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  onActivate,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconsContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    // For 'click' trigger, wait for handleTrigger to be called
    if (trigger === "scroll" && containerRef.current) {
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
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
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
    const iconBodies = [...iconElements].map((elem) => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const size = 80; // Icon body size
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

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

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
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && trigger === "click") {
      setEffectStarted(true);
      onActivate?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full overflow-hidden cursor-pointer"
      onClick={handleTrigger}
    >
      <div
        ref={iconsContainerRef}
        className="relative w-full h-full flex flex-col items-center justify-start pt-12"
      >
        {/* Main skills grid */}
        <div className="flex flex-wrap justify-center items-start gap-8 mb-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-icon flex flex-col items-center gap-2 p-4 bg-slate-700/60 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg"
            >
              <div className="text-cyan-400 scale-150">{skill.icon}</div>
              <span className="text-xs text-white/80 font-medium whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingIcons;
