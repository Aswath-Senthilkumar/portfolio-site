import CircularGallery from "@/components/ui/CircularGallery";
import { projects } from "@/constants";

export const Catalog = () => {
  // Transform projects data to match CircularGallery expected format
  const galleryItems = projects.map((project) => ({
    image: project.image,
    text: project.title,
  }));

  return (
    <div className="h-[600px] w-full relative">
      <CircularGallery
        items={galleryItems}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        font="bold 20px Azonix"
        scrollSpeed={2}
        scrollEase={0.05}
      />
    </div>
  );
};
