import { cookies } from "next/headers";

const INTERNAL_BASE_URL = process.env.INTERNAL_API_URL || "http://hcmut-portal-backend:8000";

/**
 * Server-side API fetcher using Next.js native fetch.
 * This benefits from Next.js caching, revalidation, and server-side cookies.
 */
export async function serverFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${INTERNAL_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      // Mặc định Next.js sẽ cache. Nếu muốn bỏ cache thì dùng { cache: 'no-store' }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Server Fetch: Unauthorized (401)");
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Server Fetch Error [${endpoint}]:`, error);
    return null;
  }
}
