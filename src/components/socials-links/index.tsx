import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Aswath-Senthilkumar",
    icon: <SiGithub />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aswath-senthilkumar1",
    icon: (
      <SiLinkedin
        style={{
          borderRadius: "30%",
          color: "#fff",
          padding: "2px",
        }}
      />
    ),
  },
];

export default function SocialsLinks() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-row gap-4">
      <motion.button
        className="relative overflow-hidden w-[44px] cursor-glass-effect font-heading z-15 cursor-pointer text-sm rounded-full glass-texture flex items-center justify-center pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(socialLinks[0].url, "_blank")}
      >
        <motion.div className="absolute right-1 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full cursor-glass-effect pointer-events-none" />
        <span className="relative rounded-full flex items-center justify-center w-full h-full text-2xl">
          {socialLinks[0].icon}
        </span>
      </motion.button>
      <motion.button
        className="relative overflow-hidden w-[44px] cursor-glass-effect font-heading z-15 cursor-pointer text-sm rounded-full glass-texture flex items-center justify-center pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(socialLinks[1].url, "_blank")}
      >
        <motion.div className="absolute right-1 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full cursor-glass-effect pointer-events-none" />
        <span className="relative rounded-full flex items-center justify-center w-full h-full text-[1.7rem]">
          {socialLinks[1].icon}
        </span>
      </motion.button>
    </div>
  );
}
