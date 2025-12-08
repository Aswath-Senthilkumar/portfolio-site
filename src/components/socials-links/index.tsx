import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Aswath-Senthilkumar",
    icon: <GithubIcon className="w-full h-full p-2" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aswath-senthilkumar1",
    icon: (
      <LinkedinIcon
        className="w-full h-full p-[2px]"
        style={{
          borderRadius: "30%",
          color: "#fff",
        }}
      />
    ),
  },
];

export default function SocialsLinks() {
  return (
    <div className="flex flex-row gap-4">
      <motion.button
        className="relative overflow-hidden w-[44px] cursor-glass-effect font-heading z-15 cursor-pointer text-sm rounded-full glass-texture flex items-center justify-center pointer-events-auto"
        onClick={() => window.open(socialLinks[0].url, "_blank")}
      >
        <motion.div className="absolute right-1 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full cursor-glass-effect pointer-events-none" />
        <span className="relative rounded-full flex items-center justify-center w-full h-full text-2xl">
          {socialLinks[0].icon}
        </span>
      </motion.button>
      <motion.button
        className="relative overflow-hidden w-[44px] cursor-glass-effect font-heading z-15 cursor-pointer text-sm rounded-full glass-texture flex items-center justify-center pointer-events-auto"
        onClick={() => window.open(socialLinks[1].url, "_blank")}
      >
        <motion.div className="absolute right-1 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full cursor-glass-effect pointer-events-none" />
        <span className="relative rounded-full flex items-center justify-center w-[70%] h-[70%]">
          {socialLinks[1].icon}
        </span>
      </motion.button>
    </div>
  );
}
