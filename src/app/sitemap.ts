import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexdial.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/industries",
    "/technology",
    "/ai-platform",
    "/case-studies",
    "/success-stories",
    "/clients",
    "/careers",
    "/blog",
    "/resources",
    "/pricing",
    "/partners",
    "/contact",
    "/request-demo",
    "/book-consultation",
    "/knowledge-center",
    "/faqs",
    "/privacy",
    "/terms",
    "/security",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
