import { HomeTitle } from "./hero-content/greet";
import { Taglines } from "./hero-content/taglines";
import { HomeInfoGrid } from "./hero-content/info";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Content Layer */}
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col items-start justify-start pt-32 xl:pt-28 pl-8 md:pl-20 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <HomeTitle />
        </div>
        <div className="pointer-events-auto mt-10 xl:mt-8">
          <Taglines />
        </div>
        <div className="mt-8 xl:mt-6 flex items-center">
          <HomeInfoGrid />
        </div>
      </div>
    </section>
  );
}
