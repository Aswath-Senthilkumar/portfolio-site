import { HorizontalCarousel } from "./carousel/horizontal-carousel";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-black text-white">
      <div className="w-full pt-20 pb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Projects
        </h2>
      </div>
      <HorizontalCarousel />
    </section>
  );
}
