import { ArrowButton } from "@/components/ui/arrow-button";
import { DownloadButton } from "@/components/ui/download-button";
import { useDrawerStore } from "@/stores/drawerStore";

export function HomeInfoGrid() {
  const { open: openDrawer } = useDrawerStore();

  const handleConnectClick = () => {
    console.log("🎯 Opening contact drawer from home section");
    openDrawer();
  };

  return (
    <div className="gap-8 items-center">
      <div className="flex flex-col gap-3 justify-center items-start order-1">
        <div className="flex flex-row gap-3 w-fit">
          <ArrowButton onClick={handleConnectClick}>let's connect</ArrowButton>
          <DownloadButton href="/resume.pdf">download resume</DownloadButton>
        </div>
      </div>
    </div>
  );
}
