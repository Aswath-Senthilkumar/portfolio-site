import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useContactForm } from "@/hooks/useContactForm";
import GlassButton from "@/components/ui/glass-button";

export default function ContactForm() {
  const {
    isSubmitting,
    isSuccess,
    message,
    isSubmitSuccessful,
    onSubmit,
    reset,
  } = useContactForm();

  // Fireworks confetti effect
  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      // Cleanup function to clear interval if component unmounts
      return () => clearInterval(interval);
    }
  }, [isSubmitSuccessful, isSuccess]);

  const handleReset = () => {
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 border border-white/10 rounded-lg p-8 shadow-xl shadow-gradient-to-r from-blue-400 to-purple-400 flex flex-col items-center justify-center min-h-[400px] text-center bg-black/20 backdrop-blur-sm">
        {isSuccess ? (
          <>
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-heading text-white mb-4">
              Message Sent!
            </h3>
            <p className="text-gray-300 mb-8 max-w-md">{message}</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-heading text-white mb-4">Oops!</h3>
            <p className="text-gray-300 mb-8 max-w-md">{message}</p>
          </>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 border border-white/10 h-[525px] md:h-[600px] xl:h-[430px] rounded-lg p-8 shadow-[0_8px_20px_0px_rgba(120,50,100,0.5),0_0px_5px_2px_rgba(34,10,238,0.4)] bg-black/20 backdrop-blur-md">
      <form
        onSubmit={onSubmit}
        className="space-y-6 md:space-y-14 xl:space-y-6"
      >
        {/* Name and Email in a row on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group flex flex-col gap-3">
            <label
              htmlFor="name"
              className="block text-sm md:text-2xl xl:text-sm font-heading font-medium mb-2 text-gray-300 transition-colors duration-200 group-focus-within:text-purple-400"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-white placeholder-gray-500"
              placeholder="Your name"
            />
          </div>

          <div className="group flex flex-col gap-3">
            <label
              htmlFor="email"
              className="block text-sm md:text-2xl xl:text-sm font-heading font-medium mb-2 text-gray-300 transition-colors duration-200 group-focus-within:text-blue-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-white placeholder-gray-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Subject */}
        {/* <div className="group">
          <label
            htmlFor="subject"
            className="block text-sm md:text-2xl xl:text-sm font-medium mb-2 text-gray-300 transition-colors duration-200 group-focus-within:text-pink-400"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-white placeholder-gray-500"
            placeholder="What's this about?"
          />
        </div> */}

        {/* Message */}
        <div className="group flex flex-col gap-3">
          <label
            htmlFor="message"
            className="block text-sm md:text-2xl xl:text-sm font-heading font-medium mb-2 text-gray-300 transition-colors duration-200 group-focus-within:text-cyan-400"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full h-[144px] md:h-[192px] xl:h-[144px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 text-white placeholder-gray-500 resize-none"
            placeholder="Your message here..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-4">
          <GlassButton
            type="submit"
            disabled={isSubmitting}
            className="relative px-8 py-4 md:py-6 xl:py-4 md:px-12 xl:px-8 bg-white/5 border border-white/10 rounded-lg font-semibold text-white overflow-hidden group hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] backdrop-blur-sm"
            aria-label={isSubmitting ? "Sending message" : "Send message"}
          >
            <span className="relative z-10 text-sm md:text-2xl xl:text-sm font-heading flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </span>
          </GlassButton>
        </div>
      </form>
    </div>
  );
}
