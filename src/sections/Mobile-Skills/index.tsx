import MobileSkillBox from "./mobile-skill-box";

export default function MobileSkills() {
  return (
    <section id="skills-mobile" className="relative w-full bg-black text-white">
      <div className="w-full pt-10 pb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          My Skills
        </h2>
      </div>
      <MobileSkillBox />
    </section>
  );
}
