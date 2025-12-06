import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white pt-20 pb-6 md:pb-24 xl:pb-6"
    >
      <div className="w-full max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16 xl:mb-8">
          <h2 className="text-2xl md:text-6xl xl:text-4xl font-bold mb-2 md:mb-6 xl:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg md:text-2xl xl:text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Additional Contact Info (Optional) */}
        <div className="mt-6 md:mt-16 xl:mt-6 flex flex-row justify-center items-center gap-8 text-gray-400">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 md:p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
              <svg
                className="w-4 h-4 md:w-10 md:h-10 xl:w-6 xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xs md:text-2xl xl:text-base group-hover:text-white transition-colors duration-300">
              asenth25@asu.edu
            </span>
          </div>

          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 md:p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
              <svg
                className="w-4 h-4 md:w-10 md:h-10 xl:w-6 xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-xs md:text-2xl xl:text-base group-hover:text-white transition-colors duration-300">
              San Bruno, CA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
