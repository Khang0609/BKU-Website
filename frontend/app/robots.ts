import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://portal.hcmut.edu.vn"; // Replace with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/dashboard",
          "/course",
          "/calendar",
          "/message",
          "/profile",
          "/student-service/*",
        ],
        disallow: [
          "/api/*", // Protect API routes
          "/_next/*", // Protect Next.js internals
          "/admin/*", // Protect admin routes if any
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
