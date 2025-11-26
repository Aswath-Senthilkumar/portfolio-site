import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import MobileHero from "@/sections/Mobile-Hero";
import MobileAboutMe from "@/sections/Mobile-About-Me";
import MobileWhatIDo from "@/sections/Mobile-WhatIDo";

export function MobileHome() {
  return (
    <div className="flex min-h-svh flex-col">
      <Sidebar />
      <MobileHero />
      <MobileAboutMe />
      <MobileWhatIDo />
    </div>
  );
}
