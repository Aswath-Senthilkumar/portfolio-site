import { motion } from "motion/react";
import { LazyParticleSphere } from "./model/LazyParticleSphere";
import { HomeTitle } from "../Hero/hero-content/greet";
import { Taglines } from "../Hero/hero-content/taglines";
import { HomeInfoGridMobile } from "../Mobile-Hero/hero-content/info";

export default function MobileHero() {
  return (
    <section
      id="home-mobile"
      className="w-full h-full flex items-center justify-center pt-24 mb-60"
    >
      <div className="w-full max-w-full pt-8 md:pt-24 h-[120vw] md:h-[100vw] max-h-full flex items-center justify-center mx-auto">
        <LazyParticleSphere scenePath="https://jjv5kewiwbig2jji.public.blob.vercel-storage.com/scene-f0f0f0.splinecode" />
      </div>
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col pt-20 md:pt-40 pointer-events-none overflow-hidden"
      >
        <div className="pointer-events-auto mx-auto">
          {/* Title animates FIRST (waits for global loader: approx 2.2s) */}
          <HomeTitle startDelay={0.5} />
        </div>

        {/* Taglines: Enters from LEFT (after title finishes: 3.2s) */}
        <motion.div
          className="pointer-events-auto mt-18 lg:mt-20 md:mb-20 mx-auto"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <Taglines />
        </motion.div>

        {/* Info Grid: Enters from RIGHT (after title finishes: 3.2s) */}
        <motion.div
          className="pointer-events-auto mt-10 mx-auto"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <HomeInfoGridMobile />
        </motion.div>
      </div>
    </section>
  );
}
