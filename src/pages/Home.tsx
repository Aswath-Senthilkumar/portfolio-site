import { lazy, Suspense } from "react";
import { NavBar } from "@/components/navigation/navbar";
import { useSectionTracker } from "@/hooks/useSectionTracker";
import Footer from "@/components/Footer";
import Wrapper from "@/sections/wrapper";

const WhatIDo = lazy(() => import("@/sections/WhatIDo"));
const Experience = lazy(() => import("@/sections/Experience"));
const Projects = lazy(() => import("@/sections/Projects"));
const Skills = lazy(() => import("@/sections/Skills"));
const Contact = lazy(() => import("@/sections/Contact"));

// Holds section height while chunk loads — prevents CLS from blank-to-content swap
const SectionSkeleton = () => (
  <div className="min-h-screen w-full animate-pulse px-8 py-24 flex flex-col gap-6">
    <div className="h-8 w-48 rounded bg-white/5" />
    <div className="h-4 w-96 rounded bg-white/5" />
    <div className="flex-1 rounded-xl bg-white/5" />
  </div>
);

export function Home() {
  useSectionTracker();
  return (
    <>
      <div className="flex min-h-svh flex-col">
        <NavBar show={true} />
        <main className="w-full max-w-[1550px] mx-auto">
          <Wrapper />
          <Suspense fallback={<SectionSkeleton />}><WhatIDo /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Experience /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
