import type { FC } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    demo: string;
  };
}

export const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  links,
}) => {
  return (
    <div className="relative w-[70vw] h-[60vh] bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-shrink-0">
      {/* Left Side - Image */}
      <div className="w-2/5 relative overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/30"></div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-center ">
        <div className="pr-8">
          <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-lg text-white mb-6 leading-relaxed text-justify">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {links.demo && links.demo !== "#" && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
                Live Demo
              </a>
            )}
            {links.github && links.github !== "#" && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
