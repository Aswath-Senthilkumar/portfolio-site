import { NavBar } from "@/components/navigation/navbar"
import { useSectionTracker } from "@/hooks/useSectionTracker"
import Hero from "@/sections/Hero";

export function Home() {
    useSectionTracker();
    return (
        <>
            <div className="flex min-h-svh flex-col">
                <NavBar show={true} />
                <main className="w-full max-w-[1550px] mx-auto">
                    <Hero />
                </main>
            </div>
        </>
    )
}