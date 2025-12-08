
export const getPersonStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aswath Senthilkumar",
  url: "https://ashxprojects.com",
  image: "https://ashxprojects.com/og-image.png",
  sameAs: [
    "https://github.com/Aswath-Senthilkumar",
    "https://linkedin.com/in/aswath-senthilkumar1",
  ],
  jobTitle: "Fullstack Developer & Machine Learning Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Vian Analytics",
  },
  description:
    "Patent-winning full-stack developer and Machine Learning specialist with experience at Vian Analytics, CoCreator-AI, and Flow AI. Expert in React, Python, and AI-driven solutions.",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Arizona State University",
    },
    {
      "@type": "EducationalOrganization",
      name: "Rajalakshmi Engineering College",
    },
  ],
  knowsAbout: [
    "Fullstack Development",
    "Machine Learning",
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "ReactJS",
    "NextJS",
    "Node.js",
    "AWS",
    "Docker",
    "PyTorch",
    "Tensorflow",
    "Kubernetes",
    "CI/CD",
  ],
});

export const getWebSiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aswath Senthilkumar Portfolio",
  url: "https://ashxprojects.com",
  description:
    "Portfolio of Aswath Senthilkumar - Fullstack Developer & Machine Learning Engineer",
  publisher: {
    "@type": "Person",
    name: "Aswath Senthilkumar",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://ashxprojects.com/?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
});
