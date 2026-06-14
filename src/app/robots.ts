import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/test-payment/",
        "/onboarding/",
        "/client-portal/",
        "/supervisor/",
      ],
    },
    sitemap: "https://nexdial.io/sitemap.xml",
  };
}
