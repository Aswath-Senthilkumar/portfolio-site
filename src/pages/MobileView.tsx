import { Routes, Route } from "react-router";
import { MobileHome } from "@/pages/MobileHome";

export default function MobileView() {
  return (
    <Routes>
      <Route path="/" element={<MobileHome />} />
    </Routes>
  );
}
