import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollDown() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center -space-y-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
      >
        <ChevronDown className="w-8 h-8 text-white" />
        <ChevronDown className="w-8 h-8 text-white/40" />
      </motion.div>
    </motion.div>
  );
}
