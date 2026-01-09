import { getApiBaseUrl } from "@/app/config/env";

export class HttpError extends Error {
  status: number;
  payload: unknown;
  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const http = async <TResponse>(
  path: string,
  options?: {
    method?: HttpMethod;
    body?: unknown;
    signal?: AbortSignal;
  },
): Promise<TResponse> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const requestOptions: RequestInit = {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: options?.signal ?? null,
  };

  if (options?.body !== undefined) {
    requestOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, requestOptions);

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const msg =
      typeof payload === "string"
        ? payload
        : ((payload as { message?: string })?.message ?? "Request failed");
    throw new HttpError(msg, res.status, payload);
  }

  return payload as TResponse;
};
