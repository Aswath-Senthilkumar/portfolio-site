import { HomeTitle } from "./hero-content";
import LightRays from "./background/LightRays";
import ComputersCanvas from "./model/Computers"

export default function Hero() {
    return (
        <section 
            id="home" 
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 bg-black" style={{ backgroundColor: 'black' }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>
            
            {/* Content Layer */}
            <div className="absolute inset-0 z-10">
                <HomeTitle />
            </div>
            <div className="absolute inset-0 z-10">
                <ComputersCanvas />
            </div>
        </section>
    );
}