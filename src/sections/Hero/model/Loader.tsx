import { useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import "@/index.css"

const CanvasLoader = () => {
  const { progress, active } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "75%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        height: "auto",
        zIndex: 50,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </motion.div>
  );
};

export default CanvasLoader;
