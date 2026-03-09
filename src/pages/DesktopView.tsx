import { Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export default function DesktopView() {
  return (
    <SmoothScrollProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </SmoothScrollProvider>
  );
}
