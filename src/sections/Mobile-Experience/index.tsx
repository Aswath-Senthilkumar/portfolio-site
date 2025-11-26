import { ScrollStackCards } from "./work-experience/scroll-stack-cards";

export default function MobileExperience() {
  return (
    <section
      id="experience-mobile"
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center pt-10 pb-4 px-4 scroll-mt-0"
    >
      <div className="w-full max-w-7xl mx-auto px-8 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          My Experience
        </h2>
        <p className="relative z-10 text-center text-xs text-gray-400 max-w-3xl">
          A journey through my professional career, building scalable
          applications and leading engineering teams.
        </p>
      </div>
      <ScrollStackCards />
    </section>
  );
}
