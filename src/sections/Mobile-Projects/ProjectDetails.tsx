import { Drawer } from "vaul";
import { Github, ExternalLink } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
      github: string;
      demo: string;
    };
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetails({
  project,
  open,
  onOpenChange,
}: ProjectDetailsProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-zinc-900 flex flex-col rounded-t-[10px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 outline-none">
          <div className="p-4 bg-zinc-900 rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-700 mb-8" />

            <div className="flex flex-col gap-6 pb-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-xl font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-400 md:text-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-4 mt-auto pt-4">
                {project.links.github && project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center md:text-2xl justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <Github className="size-5 md:size-8" />
                    GitHub
                  </a>
                )}
                {project.links.demo && project.links.demo !== "#" && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center md:text-2xl justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="size-5 md:size-8" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
