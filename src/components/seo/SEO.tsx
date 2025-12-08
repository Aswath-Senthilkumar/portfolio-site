import type { FC, ReactNode } from "react";

// Define proper type for JSON-LD structured data
type JsonLdType =
  | {
      "@context": string;
      "@type": string;
      [key: string]: unknown;
    }
  | {
      "@context": string;
      "@graph": Array<Record<string, unknown>>;
    };

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  twitterHandle?: string;
  jsonLd?: JsonLdType;
  children?: ReactNode;
}

export const SEO: FC<SEOProps> = ({
  title = "Aswath Senthilkumar | Fullstack Developer & Machine Learning Engineer",
  description = "Aswath Senthilkumar is a Patent-winning full-stack developer and Machine Learning specialist with experience at Vian Analytics, CoCreator-AI, and Flow AI. Expert in React, Python, and AI-driven solutions.",
  keywords = "Aswath Senthilkumar, Fullstack Developer, Machine Learning Engineer, AI Developer, React, Python, Artificial Intelligence, Portfolio, Software Engineer",
  author = "Aswath Senthilkumar",
  image = "https://ashxprojects.com/og-image.png",
  url = "https://ashxprojects.com",
  type = "website",
  // twitterHandle,
  jsonLd,
  children,
}) => {
  // Construct the full title with branding
  const fullTitle =
    title ===
    "Aswath Senthilkumar | Fullstack Developer & Machine Learning Engineer"
      ? title
      : `${title} | Aswath Senthilkumar`;

  return (
    <>
      {/* React 19 / Vite Meta Tags - specific React 19 hoisting might depend on framework support, 
          but usually standard meta tags work in the return. 
          If using react-helmet-async in the future, wrap these.
          For now, standard output as per reference. */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="Aswath Senthilkumar Portfolio" />

      {/* Twitter - Commented out as per user request
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      */}

      {/* Additional SEO Tags */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <link rel="canonical" href={url} />

      {/* Structured Data / JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {children}
    </>
  );
};
