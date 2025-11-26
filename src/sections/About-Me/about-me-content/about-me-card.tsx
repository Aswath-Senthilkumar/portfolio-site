import ScrambledText from "@/components/animations/ScrambledText";
import { forwardRef } from "react";

interface AboutMeCardProps {
  leftCardRef: React.RefObject<HTMLDivElement | null>;
  middleCardRef: React.RefObject<HTMLDivElement | null>;
  rightCardRef: React.RefObject<HTMLDivElement | null>;
}

const AboutMeCard = forwardRef<HTMLDivElement, AboutMeCardProps>(
  ({ leftCardRef, middleCardRef, rightCardRef }, ref) => {
    return (
      <div
        className="w-full max-w-8xl mx-auto px-6 flex mt-1 justify-between"
        ref={ref}
      >
        {/* Left Card */}
        <div
          ref={leftCardRef}
          className="w-[28%] flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-700/50 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 items-center"
        >
          <div className="w-full h-78 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 overflow-hidden">
            <img
              src="/images/about1.jpeg"
              alt="grad pic"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1">
            <ScrambledText
              className="!text-xs !max-w-none text-gray-300 leading-relaxed text-justify !pointer-default"
              radius={30}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              I’m a full-stack developer with two years of experience building
              digital products that blend thoughtful design with strong
              engineering. My path into computer science started from a deep
              curiosity about how technology works: from learning to code in
              high school to completing my master’s in the U.S., every step
              strengthened my drive to create things that make a tangible
              difference. What drives me now is shaping reliable, intuitive
              software that makes complexity feel simple and adds real value to
              the people who use it.
            </ScrambledText>
          </div>
        </div>

        {/* Middle Section - Top half empty, bottom half with content */}
        <div ref={middleCardRef} className="w-[38%] flex flex-col">
          {/* Top Half - Empty */}
          <div className="h-1/2"></div>

          {/* Bottom Half - Content */}
          <div className="h-1/2 flex items-end pb-6">
            <div className="w-full bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl p-4 shadow-2xl backdrop-blur-sm border border-gray-700/50 hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105">
              <ScrambledText
                className="!text-xs !max-w-none text-gray-300 leading-relaxed text-justify !pointer-default"
                radius={30}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                What keeps me excited about coding is the blend of creativity
                and clarity it demands. I enjoy refining systems, improving user
                experiences, and seeing ideas turn into products that actually
                help someone's day run smoother. Balance is key for me—dividing
                time between full-time development work and helping small
                businesses bring their first products to life. That mix keeps me
                grounded, constantly learning, and connected to why I started
                building in the first place.
              </ScrambledText>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div
          ref={rightCardRef}
          className="w-[28%] flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-700/50  hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105"
        >
          <div className="w-full h-78 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 overflow-hidden">
            <img
              src="/images/about2.jpeg"
              alt="Right card placeholder"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1">
            <ScrambledText
              className="!text-xs !max-w-none text-gray-300 leading-relaxed text-justify !pointer-default"
              radius={30}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Away from my desk, I’m usually chasing something that keeps me
              active: gaming for strategy, sports for focus, and exploration for
              perspective. I’ve always aimed to be a jack of all trades in
              sports, not for perfection, but for progress, learning something
              new from each game. Those moments remind me why balance matters,
              how creativity comes from curiosity, and growth comes from trying.
              That same mindset shapes how I approach work: stay curious, stay
              versatile, and never stop learning, whether it’s on the field or
              behind the screen.
            </ScrambledText>
          </div>
        </div>
      </div>
    );
  }
);

AboutMeCard.displayName = "AboutMeCard";

export default AboutMeCard;
