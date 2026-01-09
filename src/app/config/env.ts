export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string | undefined,
};

export function getApiBaseUrl(): string {
  const url = env.API_BASE_URL ?? "http://localhost:3001";
  return url.replace(/\/$/, "");
}
