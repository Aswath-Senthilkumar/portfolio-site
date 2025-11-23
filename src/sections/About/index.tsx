export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-8"
    >
      <div className="max-w-4xl w-full z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          About Me
        </h2>
        <div className="space-y-6 text-lg md:text-xl text-gray-300">
          <p>
            I am a passionate developer with a love for creating immersive 3D
            web experiences.
          </p>
          <p>
            My journey involves exploring the intersection of design and
            technology, bringing creative ideas to life through code.
          </p>
        </div>
      </div>
    </section>
  );
}
