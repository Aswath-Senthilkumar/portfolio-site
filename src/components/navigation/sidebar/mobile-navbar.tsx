import { navigationItems } from "@/constants/index";
import {
  useNavigationStore,
  type MobileSectionId,
} from "@/stores/navigationStore";
import { useDrawerStore } from "@/stores/drawerStore";
import GlassButton from "@/components/ui/glass-button";

interface MobileNavProps {
  onNavigationClick: () => void; // Callback to close sidebar
}

// Mapping from mobile href to section IDs
const MOBILE_HREF_TO_SECTION_MAP: Record<string, MobileSectionId> = {
  "#home-mobile": "home-mobile",
  "#what-i-do-mobile": "what-i-do-mobile",
  "#experience-mobile": "experience-mobile",
  "#projects-mobile": "projects-mobile",
  "#about-me-mobile": "about-me-mobile",
  "#skills-mobile": "skills-mobile",
};

export function MobileNav({ onNavigationClick }: MobileNavProps) {
  const { setIsNavigating, setActiveSection } = useNavigationStore();
  const { open: openDrawer } = useDrawerStore();

  const handleNavClick = (item: (typeof navigationItems)[0]) => {
    // Handle Contact button specifically
    if (item.name === "Contact") {
      console.log("🎯 Opening contact drawer from mobile navigation");
      openDrawer();
      onNavigationClick(); // Close sidebar
      return;
    }

    // Handle section navigation for other links using mobile links
    const mobileHref = item.mobileLink;
    if (mobileHref.startsWith("#")) {
      const targetId = mobileHref.substring(1); // Remove the #
      const targetElement = document.getElementById(targetId);
      const targetSectionId = MOBILE_HREF_TO_SECTION_MAP[mobileHref];

      if (targetElement && targetSectionId) {
        console.log(`🎯 Starting mobile navigation to: ${targetSectionId}`);

        // Start navigation state (pauses section tracking)
        setIsNavigating(true);

        // Immediately set the target section for better UX
        setActiveSection(targetSectionId);

        // Start smooth scroll
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // End navigation state after scroll completes
        setTimeout(() => {
          console.log("🏁 Mobile navigation completed");
          setIsNavigating(false);
        }, 1000); // 1 second should be enough for smooth scroll

        // Close sidebar after navigation
        onNavigationClick();
      }
    }
  };

  return (
    <nav className="flex flex-col gap-2 flex-1 p-4">
      {navigationItems.map((item) => {
        // Special handling for Contact item
        if (item.name === "Contact") {
          return (
            <GlassButton
              key={item.name}
              onClick={() => handleNavClick(item)}
              size="lg"
              className="w-full font-heading pt-0.5 text-md mt-4"
              variant="outline"
            >
              {item.name}
            </GlassButton>
          );
        }

        // Regular navigation items
        return (
          <button
            key={item.name}
            onClick={() => handleNavClick(item)}
            className="flex items-center gap-3 py-3 text-xl font-heading text-foreground rounded-lg transition-all hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground focus:outline-none border-b rounded-s-none rounded-e-none text-left cursor-pointer"
          >
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
