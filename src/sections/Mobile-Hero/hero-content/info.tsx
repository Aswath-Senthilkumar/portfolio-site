import { useDrawerStore } from "@/stores/drawerStore";
import { ShineBorder } from "@/components/ui/shine-border";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { ArrowRight, Download } from "lucide-react";

export function HomeInfoGridMobile() {
  const { open: openDrawer } = useDrawerStore();

  const handleConnectClick = () => {
    console.log("🎯 Opening contact drawer from home section");
    openDrawer();
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Aswath-Senthilkumar",
      icon: <SiGithub className="w-6 h-6" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/aswath-senthilkumar1",
      icon: <SiLinkedin className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 items-center w-full px-0 pointer-events-auto">
      {/* Main Actions */}
      <div className="flex flex-col w-full gap-4 px-4">
        <button
          onClick={handleConnectClick}
          className="relative group flex items-center justify-center w-full rounded-full bg-black/10 backdrop-blur-md overflow-hidden"
        >
          <ShineBorder
            className="rounded-full"
            borderWidth={2}
            shineColor={["#ffffff"]}
          />
          <span className="relative mx-auto z-10 py-4 text-base font-medium text-white flex items-center gap-2">
            let's connect
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <a
          href="/resume.pdf"
          className="relative group flex items-center justify-center w-[200px] rounded-full bg-black/10 backdrop-blur-md overflow-hidden"
        >
          <ShineBorder
            className="rounded-full"
            borderWidth={2}
            shineColor={["#ffffff"]}
          />
          <span className="relative z-10 py-4 text-base font-medium text-white flex items-center gap-2">
            download resume
            <Download className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform" />
          </span>
        </a>
      </div>

      {/* Social Links */}
      <div className="flex gap-6 mt-2">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-black/10 backdrop-blur-md overflow-hidden"
          >
            <ShineBorder
              className="rounded-full"
              borderWidth={2}
              shineColor={["#ffffff"]}
            />
            <span className="relative z-10 flex items-center justify-center text-white">
              {social.icon}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
