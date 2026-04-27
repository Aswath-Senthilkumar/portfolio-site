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

export function Home() {
  useSectionTracker();
  return (
    <>
      <div className="flex min-h-svh flex-col">
        <NavBar show={true} />
        <main className="w-full max-w-[1550px] mx-auto">
          <Wrapper />
          <Suspense fallback={null}><WhatIDo /></Suspense>
          <Suspense fallback={null}><Experience /></Suspense>
          <Suspense fallback={null}><Projects /></Suspense>
          <Suspense fallback={null}><Skills /></Suspense>
          <Suspense fallback={null}><Contact /></Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
