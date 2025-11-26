import { create } from 'zustand';

// Desktop Section IDs
type DesktopSectionId = 'home' | 'what-i-do' | 'experience' | 'about-me' | 'skills';

// Mobile Section IDs  
type MobileSectionId = 'home-mobile' | 'what-i-do-mobile' | 'experience-mobile' | 'about-me-mobile' | 'skills-mobile' | 'projects-mobile';

// Combined Section IDs
type SectionId = DesktopSectionId | MobileSectionId;

// Navigation item names from the constants
type NavigationItem = "Home" | "What I Do" | "Experience" | "About Me" | "Skills" | "Projects";

// Mapping from desktop section IDs to navigation item names
const DESKTOP_SECTION_TO_NAV_MAP: Record<DesktopSectionId, NavigationItem> = {
    'home': "Home",
    'what-i-do': "What I Do",
    'experience': "Experience",
    'about-me': "About Me",
    'skills': "Skills",
};

// Mapping from mobile section IDs to navigation item names
const MOBILE_SECTION_TO_NAV_MAP: Record<MobileSectionId, NavigationItem> = {
    'home-mobile': "Home",
    'what-i-do-mobile': "What I Do",
    'experience-mobile': "Experience",
    'about-me-mobile': "About Me",
    'skills-mobile': "Skills",
    'projects-mobile': "Projects",
};

// Helper function to detect if we're on mobile
const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
};

interface NavigationState {
    activeSection: SectionId | null;
    isNavigating: boolean;
    setActiveSection: (sectionId: SectionId | null) => void;
    setIsNavigating: (navigating: boolean) => void;
    getActiveNavigationItem: () => NavigationItem | null;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
    activeSection: null,
    isNavigating: false,

    setActiveSection: (sectionId: SectionId | null) => {
        set({ activeSection: sectionId });
    },

    setIsNavigating: (navigating: boolean) => {
        console.log(`🧭 Navigation state: ${navigating ? 'START' : 'END'}`);
        set({ isNavigating: navigating });
    },

    getActiveNavigationItem: () => {
        const { activeSection } = get();
        if (!activeSection) return null;

        // Check if it's a mobile section
        if (activeSection.includes('-mobile')) {
            return MOBILE_SECTION_TO_NAV_MAP[activeSection as MobileSectionId] || null;
        }

        // Otherwise it's a desktop section
        return DESKTOP_SECTION_TO_NAV_MAP[activeSection as DesktopSectionId] || null;
    },
}));

// Export mappings and helper functions for use in other components
export {
    DESKTOP_SECTION_TO_NAV_MAP,
    MOBILE_SECTION_TO_NAV_MAP,
    isMobile
};
export type { SectionId, NavigationItem, DesktopSectionId, MobileSectionId };