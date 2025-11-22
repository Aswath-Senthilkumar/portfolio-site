import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import Hero from "@/sections/Hero";

export function MobileHome() {
    return (
        <div className="flex min-h-svh flex-col">
            <Sidebar />
            <Hero />
        </div>
    )
}
