import { forwardRef } from "react";

interface MobileAboutMeCardProps {
  imageCardRef: React.RefObject<HTMLDivElement | null>;
  firstTextRef: React.RefObject<HTMLDivElement | null>;
  secondImageCardRef: React.RefObject<HTMLDivElement | null>;
  secondTextRef: React.RefObject<HTMLDivElement | null>;
}

const MobileAboutMeCard = forwardRef<HTMLDivElement, MobileAboutMeCardProps>(
  ({ imageCardRef, firstTextRef, secondImageCardRef, secondTextRef }, ref) => {
    return (
      <div className="w-full max-w-6xl mx-auto px-6 pb-12" ref={ref}>
        {/* Grid container - 1 column on mobile, 2 columns on tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Row: Image + Text */}
          <div
            ref={imageCardRef}
            className="w-full flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-700/50"
          >
            <div className="w-full h-64 md:h-120 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 overflow-hidden">
              <img
                src="/images/about1.jpeg"
                alt="grad pic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            ref={firstTextRef}
            className="w-full bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 flex items-center"
          >
            <p className="text-sm md:text-xl text-gray-300 leading-relaxed text-justify">
              I'm a full-stack developer with two years of experience building
              products that blend design, reliability, and real-world impact. My
              path into computer science began with a simple curiosity about how
              technology works: from experimenting with code in high school to
              earning my master's in the U.S. What drives me now is creating
              software that feels effortless to use and genuinely useful to
              people. Alongside my full-time work as a developer, I also help
              small businesses bring their first ideas to life-turning early
              concepts into dependable products.
            </p>
          </div>

          {/* Second Row: Image + Text */}
          <div
            ref={secondImageCardRef}
            className="w-full flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-700/50"
          >
            <div className="w-full h-64 md:h-120 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 overflow-hidden">
              <img
                src="/images/about2.png"
                alt="personal photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            ref={secondTextRef}
            className="w-full bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 flex items-center"
          >
            <p className="text-sm md:text-xl text-gray-300 leading-relaxed text-justify">
              Away from my desk, I'm usually doing something that keeps me
              active: gaming for strategy, sports for discipline, and
              exploration for perspective. I've always aimed to be a jack of all
              trades in sports, not for perfection, but for progress. That same
              mindset shapes how I approach work: stay curious, stay versatile,
              and keep learning, both on the field and in front of the screen.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

MobileAboutMeCard.displayName = "MobileAboutMeCard";

export default MobileAboutMeCard;
