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
      <div className="w-full max-w-full h-[120vw] max-h-full flex items-center justify-center mx-auto">
        <ParticleSphere />
      </div>
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col pt-20 pointer-events-none"
      >
        <div className="pointer-events-auto mx-auto">
          <HomeTitle />
        </div>
        <div className="pointer-events-auto mt-14 mx-auto ">
          <Taglines />
        </div>
        <div className="pointer-events-auto mt-10 mx-auto">
          <HomeInfoGridMobile />
        </div>
      </div>
    </section>
  );
}
