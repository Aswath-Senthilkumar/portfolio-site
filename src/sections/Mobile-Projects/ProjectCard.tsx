import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  type PanInfo,
  animate,
} from "framer-motion";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";
import ProjectDetails from "./ProjectDetails";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
      github: string;
      demo: string;
    };
  };
  index: number;
  isFront: boolean;
  onSwipe: (direction: "left" | "right") => void;
}

export default function ProjectCard({
  project,
  index,
  isFront,
  onSwipe,
}: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Rotation based on drag
  const dragRotate = useTransform(x, [-200, 200], [-25, 25]);

  // Static rotation for the stack effect (alternating)
  const stackRotate = useMotionValue(0);

  // Combine rotations
  const rotate = useTransform(
    [dragRotate, stackRotate],
    ([d, s]: any[]) => d + s
  );

  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  useEffect(() => {
    // Reset x position when index changes (card moves in stack)
    controls.start({ x: 0, transition: { duration: 0.5 } });

    // Animate scale and stack rotation
    const targetScale = 1 - index * 0.05;
    const targetRotate = index === 0 ? 0 : index % 2 === 0 ? 3 : -3;

    controls.start({
      scale: targetScale,
      transition: { duration: 0.3 },
    });

    animate(stackRotate, targetRotate, {
      type: "spring",
      stiffness: 200,
      damping: 20,
    });
  }, [index, controls, stackRotate]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      await controls.start({
        x: -500,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      onSwipe("left");
    } else if (offset > 100 || velocity > 500) {
      await controls.start({
        x: 500,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      onSwipe("right");
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  return (
    <>
      <motion.div
        style={{
          x,
          rotate,
          opacity,
          zIndex: 10 - index,
        }}
        drag={isFront ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ scale: 1 - index * 0.05, x: 0 }}
        className="absolute top-0 left-0 w-full h-[80vh] rounded-3xl bg-[#060010] border border-[#353739] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing origin-bottom"
      >
        {/* Image Section - Top Half */}
        <div className="h-[60%] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060010] z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Content Section - Bottom Half */}
        <div className="h-[40%] p-6 flex flex-col justify-between bg-[#060010] relative z-20 -mt-2">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white line-clamp-2">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-row">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsOpen(true);
                }}
                className="p-2 rounded-full flex flex-row items-center text-md gap-2 bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
              >
                Learn more <Info size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-4">
            {isFront ? "Swipe left or right" : "Next Project"}
          </div>
        </div>
      </motion.div>

      <ProjectDetails
        project={project}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
