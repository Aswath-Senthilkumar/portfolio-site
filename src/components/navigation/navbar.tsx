import { useState, useRef } from "react";
import { Globe } from "lucide-react";
import { navigationItems } from "@/constants/index";
import { Tab } from "./tab";
import { Cursor } from "./cursor";
import { Sidebar } from "./sidebar/sidebar";
import { useNavigationStore } from "@/stores/navigationStore";
import type { Position } from "./types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface NavBarProps {
  show?: boolean;
}

export function NavBar({ show = true }: NavBarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Get active navigation item using optimized selector
  const activeNavigationItem = useNavigationStore((state) =>
    state.getActiveNavigationItem()
  );

  useGSAP(() => {
    if (show) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    } else {
      gsap.set(navRef.current, {
        y: -100,
        opacity: 0,
      });
    }
  }, [show]);

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile, visible on md+ */}
      <nav
        ref={navRef}
        className="fixed top-7 left-1/2 -translate-x-1/2 z-50 hidden md:block opacity-0 -translate-y-24"
      >
        <ul
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
          className="backdrop-blur-[12px] bg-white/[0.02] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-full flex items-center justify-center gap-2 px-2 py-2 relative [box-shadow:inset_0_0_15px_rgba(255,255,255,0.05)] saturate-[180%]"
        >
          {navigationItems.map((item) => (
            <Tab
              key={item.name}
              setPosition={setPosition}
              href={item.link}
              isActive={activeNavigationItem === item.name}
            >
              {item.name === "Contact" && <Globe className="w-4 h-4" />}
              {item.name}
            </Tab>
          ))}

          <Cursor position={position} />
        </ul>
      </nav>

      <Sidebar />
    </>
  );
}
