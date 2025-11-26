import { NavBar } from "@/components/navigation/navbar";
import { useSectionTracker } from "@/hooks/useSectionTracker";
import WhatIDo from "@/sections/WhatIDo";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import Wrapper from "@/sections/wrapper";

export function Home() {
  useSectionTracker();
  return (
    <>
      <div className="flex min-h-svh flex-col">
        <NavBar show={true} />
        <main className="w-full max-w-[1550px] mx-auto">
          <Wrapper />
          <WhatIDo />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
