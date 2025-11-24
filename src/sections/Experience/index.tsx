import { ScrollStackCards } from "./work_experience/ScrollStackCards";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-start pt-20"
    >
      <div className="w-full max-w-7xl px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Work Experience
        </h2>
        <p className="relative z-10 text-center text-gray-400 max-w-2xl mx-auto">
          A journey through my professional career, building scalable
          applications and leading engineering teams.
        </p>
      </div>

      <ScrollStackCards />
    </section>
  );
}
