import client, { BASE_URL } from "@/lib/client";

export { BASE_URL };

// Helper for making API requests using the new axios client
// Usage: const res = await getProducts(); (returns data directly)

export async function getProducts() {
  const res = await client.get("products");
  return res.data;
}

export async function getProjects() {
  const res = await client.get("projects");
  return res.data;
}
