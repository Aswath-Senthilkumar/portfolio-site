import { motion } from "motion/react";
import { Monitor, Gamepad } from "lucide-react";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({
  onComplete,
}: LoadingAnimationProps) {
  return (
    <div className="relative w-full h-screen">
      {/* Ball Animation */}
      <motion.div
        className="absolute left-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        initial={{
          x: "-50%",
          top: "-200px",
          width: "10px",
          height: "20px",
          scaleY: 1.2,
          scaleX: 0.9,
        }}
        animate={{
          top: [
            "-200px",
            "50%",
            "25%",
            "50%",
            "25%",
            "50%",
            "25%",
            "50%",
            "110%",
          ],
          scaleY: [1.2, 0.6, 1.1, 0.6, 1.1, 0.6, 1.1, 0.6, 1.5],
          scaleX: [0.9, 1.4, 0.95, 1.4, 0.95, 1.4, 0.95, 1.4, 0.8],
        }}
        transition={{
          duration: 3,
          times: [0, 0.15, 0.27, 0.39, 0.51, 0.63, 0.75, 0.87, 1],
          ease: [
            "easeIn",
            "circOut",
            "circIn",
            "circOut",
            "circIn",
            "circOut",
            "circIn",
            "easeIn",
          ],
        }}
        style={{
          zIndex: 30,
          backgroundColor: "white",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          willChange: "transform, top",
        }}
        onAnimationComplete={onComplete}
      />

      {/* Computer Icon - First Bounce (Impact at 0.45s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: "-50%", y: "-50%", scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 0.45,
        }}
        style={{
          zIndex: 40,
          willChange: "transform",
        }}
      >
        <Monitor className="w-16 h-16 text-white" strokeWidth={1} />
      </motion.div>

      {/* Controller Icon - Second Bounce (Impact at 1.17s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: "-50%", y: "-50%", scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 1.17,
        }}
        style={{
          zIndex: 40,
          willChange: "transform",
        }}
      >
        <Gamepad className="w-16 h-16 text-white" strokeWidth={1} />
      </motion.div>

      {/* Tennis Icon - Third Bounce (Impact at 1.89s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: "-50%", y: "-50%", scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 1.89,
        }}
        style={{
          zIndex: 40,
          willChange: "transform",
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M19.52 2.49C17.18.15 12.9.62 9.97 3.55c-1.6 1.6-2.52 3.87-2.54 5.46-.02 1.58.26 3.89-1.35 5.5l-4.24 4.24 1.42 1.42 4.24-4.24c1.61-1.61 3.92-1.33 5.5-1.35s3.86-.94 5.46-2.54c2.92-2.93 3.4-7.21 1.06-9.55m-9.2 9.19c-1.53-1.53-1.05-4.61 1.06-6.72s5.18-2.59 6.72-1.06c1.53 1.53 1.05 4.61-1.06 6.72s-5.18 2.59-6.72 1.06M18 17c.53 0 1.04.21 1.41.59.78.78.78 2.05 0 2.83-.37.37-.88.58-1.41.58s-1.04-.21-1.41-.59c-.78-.78-.78-2.05 0-2.83.37-.37.88-.58 1.41-.58m0-2c-1.02 0-2.05.39-2.83 1.17-1.56 1.56-1.56 4.09 0 5.66.78.78 1.81 1.17 2.83 1.17s2.05-.39 2.83-1.17c1.56-1.56 1.56-4.09 0-5.66C20.05 15.39 19.02 15 18 15" />
        </svg>
      </motion.div>
    </div>
  );
}
