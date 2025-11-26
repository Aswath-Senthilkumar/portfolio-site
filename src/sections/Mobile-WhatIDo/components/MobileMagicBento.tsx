import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  component?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: BentoCardProps[];
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "132, 0, 255";

// Reusing ParticleCard logic from MagicBento but simplifying for mobile if needed
// For now, I'll copy the necessary parts to ensure it works standalone or import if exported.
// Since ParticleCard is not exported from MagicBento, I will replicate the minimal needed logic
// or ask to export it. To avoid modifying MagicBento too much, I'll replicate the card logic
// but optimized for mobile (less particles, no tilt/magnetism by default if not needed).

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  clickEffect?: boolean;
  enableTilt?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = false,
  enableTilt = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 300); // Slower stagger for continuous effect

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    // Always animate particles
    animateParticles();

    // Default glow effect - stronger for visibility
    element.style.setProperty("--glow-intensity", "0.8");

    // Device orientation tilt
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!element) return;

      const beta = e.beta || 0; // x-axis tilt (-180 to 180)
      const gamma = e.gamma || 0; // y-axis tilt (-90 to 90)

      // Increased sensitivity (divided by 1.5 instead of 2) and range (15deg)
      const rotateX = Math.max(-15, Math.min(15, beta / 1.5));
      const rotateY = Math.max(-15, Math.min(15, gamma / 1.5));

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    if (enableTilt) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (enableTilt) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    clickEffect,
    glowColor,
    enableTilt,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const MobileMagicBento: React.FC<BentoProps> = ({
  enableBorderGlow = true,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  cards = [],
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // We expect exactly 6 cards for this specific layout
  // 0: Architecture (Small)
  // 1: Speed (Small)
  // 2: Capabilities (Large)
  // 3: Services/Experienced In (Large) -> This is actually index 3 in the source array but user wants it at bottom
  // 4: Safety (Small)
  // 5: Results (Small)

  // Re-ordering based on user request:
  // Row 1: Architecture (0), Speed (1)
  // Row 2: Capabilities (2)
  // Row 3: Safety (4), Results (5)
  // Row 4: Experienced In (3)

  const orderedCards = [
    cards[0], // Architecture
    cards[1], // Speed
    cards[2], // Capabilities
    cards[4], // Safety
    cards[5], // Results
    cards[3], // Experienced In
  ];

  return (
    <>
      <style>
        {`
          .mobile-bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
          }
          
          .mobile-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
            width: 100%;
          }

          .card-small {
            grid-column: span 1;
            aspect-ratio: 1/1;
          }

          .card-large {
            grid-column: span 2;
            min-height: 240px;
          }

          /* Always show border glow, not just on hover */
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
            opacity: 1; /* Always visible */
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
        `}
      </style>

      <div className="mobile-bento-section mobile-grid" ref={gridRef}>
        {orderedCards.map((card, index) => {
          if (!card) return null;

          // Determine class based on index in our ordered array
          // 0, 1: Small (Row 1)
          // 2: Large (Row 2)
          // 3, 4: Small (Row 3)
          // 5: Large (Row 4)

          const isLarge = index === 2 || index === 5;
          const gridClass = isLarge ? "card-large" : "card-small";

          const baseClassName = `card ${gridClass} flex flex-col justify-between relative p-4 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-100 ease-in-out active:scale-95 ${
            enableBorderGlow ? "card--border-glow" : ""
          }`;

          const cardStyle = {
            backgroundColor: card.color || "var(--background-dark)",
            borderColor: "var(--border-color)",
            color: "var(--white)",
            "--glow-x": "50%",
            "--glow-y": "50%",
            "--glow-intensity": "0",
            "--glow-radius": "200px",
          } as React.CSSProperties;

          return (
            <ParticleCard
              key={index}
              className={baseClassName}
              style={cardStyle}
              disableAnimations={disableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              clickEffect={clickEffect}
              enableTilt={true} // Always enable tilt for mobile if supported
            >
              {card.component ? (
                card.component
              ) : (
                <>
                  {card.icon && (
                    <div className="card__icon absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 opacity-100">
                      <div
                        className="w-32 h-32 text-[rgba(132,0,255,0.1)] transform scale-150 blur-sm flex items-center justify-center"
                        style={{
                          color: `rgba(${glowColor}, 0.15)`,
                          filter: "drop-shadow(0 0 20px rgba(132,0,255,0.3))",
                        }}
                      >
                        {React.cloneElement(
                          card.icon as React.ReactElement<any>,
                          {
                            className: "w-[50%] h-[50%]",
                            strokeWidth: 1,
                          }
                        )}
                      </div>
                    </div>
                  )}
                  <div className="card__header flex justify-between gap-2 relative text-white z-10">
                    <span className="card__label text-xs opacity-70">
                      {card.label}
                    </span>
                  </div>
                  <div className="card__content flex flex-col relative text-white z-10 mt-auto">
                    <h3 className="card__title font-normal text-sm m-0 mb-1">
                      {card.title}
                    </h3>
                    <p className="card__description text-[10px] leading-4 opacity-80">
                      {card.description}
                    </p>
                  </div>
                </>
              )}
            </ParticleCard>
          );
        })}
      </div>
    </>
  );
};

export default MobileMagicBento;
