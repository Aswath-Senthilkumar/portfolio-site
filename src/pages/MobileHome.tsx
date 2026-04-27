import { lazy, Suspense } from "react";
import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import MobileHero from "@/sections/Mobile-Hero";
import Footer from "@/components/Footer";

const MobileAboutMe = lazy(() => import("@/sections/Mobile-About-Me"));
const MobileWhatIDo = lazy(() => import("@/sections/Mobile-WhatIDo"));
const MobileExperience = lazy(() => import("@/sections/Mobile-Experience"));
const MobileProjects = lazy(() => import("@/sections/Mobile-Projects"));
const MobileSkills = lazy(() => import("@/sections/Mobile-Skills"));
const Contact = lazy(() => import("@/sections/Contact"));

export function MobileHome() {
  return (
    <div className="flex min-h-svh flex-col">
      <Sidebar />
      <MobileHero />
      <Suspense fallback={null}><MobileAboutMe /></Suspense>
      <Suspense fallback={null}><MobileWhatIDo /></Suspense>
      <Suspense fallback={null}><MobileExperience /></Suspense>
      <Suspense fallback={null}><MobileProjects /></Suspense>
      <Suspense fallback={null}><MobileSkills /></Suspense>
      <Suspense fallback={null}><Contact /></Suspense>
      <Footer />
    </div>
  );
}
