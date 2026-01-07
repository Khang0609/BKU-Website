import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portal.hcmut.edu.vn"; // Replace with your actual domain

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/course`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/message`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Student service pages
  const studentServices = [
    "exam-appeal",
    "card-printing",
    "graduation-verification",
    "english-test",
    "student-verification",
    "exam-deferral",
    "course-withdrawal",
    "degree-declaration",
    "it-certificate",
  ];

  const servicePages = studentServices.map((service) => ({
    url: `${baseUrl}/student-service/${service}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...mainPages, ...servicePages];
}
