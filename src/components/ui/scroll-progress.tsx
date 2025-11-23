import { motion, type MotionProps, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps extends Omit<MotionProps, "style"> {
  className?: string;
  progress: any; // Using any for MotionValue to avoid strict type issues with different versions
  springOptions?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
    restDelta?: number;
  };
}

export function ScrollProgress({
  className,
  progress,
  springOptions,
  ...props
}: ScrollProgressProps) {
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    ...springOptions,
  });

  return (
    <motion.div
      className={cn("origin-left", className)}
      style={{ scaleX }}
      {...props}
    />
  );
}
