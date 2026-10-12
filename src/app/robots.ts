import { MetadataRoute } from "next";
import { profileData } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = profileData.website || "https://sojib.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
