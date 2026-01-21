import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://hcmut-portal-backend:8000";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
};

export const BASE_URL = getApiUrl();

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach the Bearer token from localStorage to every request
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    // If status is 401, implement the Refresh Token logic
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // It must call /auth/refresh using credentials: 'include' (to send the HttpOnly cookie)
        // In axios, credentials: 'include' is withCredentials: true
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { access_token } = response.data;

        // If refresh succeeds, update localStorage and retry the original failed request
        if (access_token) {
          localStorage.setItem("token", access_token);

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          // Retry the request
          return client(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear localStorage and redirect to "/"
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default client;
