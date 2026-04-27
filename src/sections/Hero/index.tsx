import { motion } from "motion/react";
import { HomeTitle } from "./hero-content/greet";
import { Taglines } from "./hero-content/taglines";
import { HomeInfoGrid } from "./hero-content/info";
import { ScrollDown } from "./hero-content/scroll-down";
import { useLoaderStore } from "@/stores/loaderStore";

export default function Hero() {
  const loaderDone = useLoaderStore((s) => s.done);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Content Layer */}
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col items-start justify-start pt-32 xl:pt-28 2xl:pt-40 pl-8 md:pl-20 pointer-events-none"
      >
        <div className="pointer-events-auto">
          {/* Title animates FIRST after loader fades */}
          <HomeTitle startDelay={0.05} play={loaderDone} />
        </div>

        {/* Content Section: Enters from LEFT after title settles */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={loaderDone ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        >
          <div className="pointer-events-auto mt-10 xl:mt-8">
            <Taglines />
          </div>
          <div className="mt-8 xl:mt-6 2xl:mt-10 flex items-center">
            <HomeInfoGrid />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollDown play={loaderDone} />
    </section>
  );
}
