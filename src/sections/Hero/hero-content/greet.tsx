import SplitText from "@/components/animations/SplitText";

interface HomeTitleProps {
  startDelay?: number;
}

export function HomeTitle({ startDelay = 0 }: HomeTitleProps) {
  return (
    <div className="w-full">
      <h1 className="text-left text-[clamp(2rem,2vw,12rem)] md:text-[clamp(4rem,4vw,16rem)] xl:text-[clamp(2rem,3vw,12rem)] 2xl:text-[clamp(3rem,2vw,12rem)] tracking-tight text-foreground cursor-default">
        <SplitText
          text="Hey, I'm Aswath"
          className="font-semibold text-center"
          delay={100}
          duration={1}
          ease="elastic.out(1, 0.3)"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0, delay: startDelay }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </h1>
    </div>
  );
}
