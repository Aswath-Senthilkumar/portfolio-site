import { motion } from 'motion/react';
import { Monitor, Gamepad } from 'lucide-react';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  return (
    <div className="relative w-full h-screen">
      {/* Ball Animation */}
      <motion.div
        className="absolute left-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        initial={{
          x: '-50%',
          top: '-200px',
          width: '10px',
          height: '20px',
          scaleY: 1.2,
          scaleX: 0.9
        }}
        animate={{
          top: ['-200px', '50%', '25%', '50%', '25%', '50%', '25%', '50%', '110%'],
          scaleY: [1.2, 0.6, 1.1, 0.6, 1.1, 0.6, 1.1, 0.6, 1.5],
          scaleX: [0.9, 1.4, 0.95, 1.4, 0.95, 1.4, 0.95, 1.4, 0.8],
        }}
        transition={{
          duration: 3,
          times: [0, 0.15, 0.27, 0.39, 0.51, 0.63, 0.75, 0.87, 1],
          ease: ["easeIn", "circOut", "circIn", "circOut", "circIn", "circOut", "circIn", "easeIn"]
        }}
        style={{
          zIndex: 30,
          backgroundColor: 'white',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
          willChange: 'transform, top'
        }}
        onAnimationComplete={onComplete}
      />

      {/* Computer Icon - First Bounce (Impact at 0.45s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: '-50%', y: '-50%', scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 0.45
        }}
        style={{
          zIndex: 40,
          willChange: 'transform'
        }}
      >
        <Monitor className="w-16 h-16 text-white" strokeWidth={1} />
      </motion.div>

      {/* Controller Icon - Second Bounce (Impact at 1.17s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: '-50%', y: '-50%', scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 1.17
        }}
        style={{
          zIndex: 40,
          willChange: 'transform'
        }}
      >
        <Gamepad className="w-16 h-16 text-white" strokeWidth={1} />
      </motion.div>

      {/* Tennis Icon - Third Bounce (Impact at 1.89s) */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ x: '-50%', y: '-50%', scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 0.72,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          delay: 1.89
        }}
        style={{
          zIndex: 40,
          willChange: 'transform'
        }}
      >
        <SportsTennisIcon sx={{ fontSize: 64, color: 'white' }} />
      </motion.div>
    </div>
  );
}
