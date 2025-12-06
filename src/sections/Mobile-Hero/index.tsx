import { ParticleSphere } from "./model/particle-sphere";
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
        <ParticleSphere />
      </div>
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col pt-20 md:pt-40 pointer-events-none"
      >
        <div className="pointer-events-auto mx-auto">
          <HomeTitle />
        </div>
        <div className="pointer-events-auto mt-18 lg:mt-20 md:mb-20 mx-auto ">
          <Taglines />
        </div>
        <div className="pointer-events-auto mt-10 mx-auto">
          <HomeInfoGridMobile />
        </div>
      </div>
    </section>
  );
}
