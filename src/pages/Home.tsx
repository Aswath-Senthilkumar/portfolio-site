import { NavBar } from "@/components/navigation/navbar"
import { useSectionTracker } from "@/hooks/useSectionTracker"

export function Home() {
    useSectionTracker();
    return (
        <div className="flex min-h-svh flex-col">
            <NavBar />
        </div>
    )
}