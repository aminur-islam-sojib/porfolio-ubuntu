import { profileData } from "@/data/profile";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.title,
    url: profileData.website,
    email: profileData.email,
    sameAs: [
      profileData.socials.github,
      profileData.socials.linkedin,
      profileData.socials.twitter,
    ].filter(Boolean),
    description: profileData.subtitle,
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "Cloud Architecture",
      "PostgreSQL",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profileData.name} — Full-Stack Developer Portfolio`,
    url: profileData.website,
    description: "Interactive Ubuntu 24.04 Linux desktop web portfolio featuring software projects, terminal, and classic view.",
    author: {
      "@type": "Person",
      name: profileData.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

