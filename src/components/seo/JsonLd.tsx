import { profileData } from "@/data/profile";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    alternateName: [profileData.fullName, "Sojib", "Aminur Islam"],
    jobTitle: profileData.title,
    worksFor: {
      "@type": "Organization",
      name: "Softvence",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    url: profileData.website,
    email: profileData.email,
    telephone: profileData.phone,
    image: `${profileData.website}${profileData.avatarUrl}`,
    sameAs: [
      profileData.socials.github,
      profileData.socials.linkedin,
      profileData.socials.codeforces,
      profileData.socials.facebook,
      profileData.socials.instagram,
    ].filter(Boolean),
    description: profileData.subtitle,
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Fullstack Web Development",
      "MERN Stack",
      "REST APIs",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profileData.name} — Fullstack Developer Portfolio`,
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
