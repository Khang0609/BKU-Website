import { BASE_URL } from "@/lib/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function authFetch(url: string, options: FetchOptions = {}) {
  // 1. Get the current access token
  let token = localStorage.getItem("token");

  // 2. Prepare headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // 3. First attempt
  let response = await fetch(url, { ...options, headers });

  // 4. If 401, try to refresh
  if (response.status === 401) {
    try {
      // Attempt to refresh token using the HttpOnly cookie
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        // Credentials 'include' is CRITICAL for sending cookies
        credentials: "include",
      });

      if (!refreshRes.ok) {
        // Refresh failed (e.g. refresh token also expired)
        // Redirect to login or handle logout
        localStorage.removeItem("token");
        // Optionally redirect: window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      // 5. Get new access token
      const data = await refreshRes.json();
      const newToken = data.access_token;

      // 6. Save new token
      localStorage.setItem("token", newToken);

      // 7. Retry the original request with new token
      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };

      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      // If refresh flow completely fails, bubble up the error or logout
      console.error("Token refresh failed", error);
      throw error;
    }
  }

  return response;
}
