import type { FC } from "react";

interface MenuItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    demo: string;
  };
}

interface ProjectInfoProps {
  item: MenuItem;
  onClose: () => void;
}

export const ProjectInfo: FC<ProjectInfoProps> = ({ item, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none p-8">
      <div
        className="relative w-[60vw] max-h-[80vh] bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden pointer-events-auto shadow-2xl flex"
        style={{
          animation: "morphIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full hover:bg-black/50 backdrop-blur-sm"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Left Side - Square Image */}
        <div className="w-2/5 relative overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/30"></div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="pr-8">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              {item.title}
            </h2>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, index) => (
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
              {item.links.demo && item.links.demo !== "#" && (
                <a
                  href={item.links.demo}
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
              {item.links.github && item.links.github !== "#" && (
                <a
                  href={item.links.github}
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

        <style>
          {`
          @keyframes morphIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
              border-radius: 50%;
            }
            50% {
              opacity: 1;
              border-radius: 20%;
            }
            100% {
              opacity: 1;
              transform: scale(1);
              border-radius: 1rem;
            }
          }
          `}
        </style>
      </div>
    </div>
  );
};
