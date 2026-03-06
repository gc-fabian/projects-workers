const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

let authToken: string | null = null;

export function setHttpAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    throw (
      data ??
      ({
        error: { code: "HTTP_ERROR", message: `HTTP ${response.status}` }
      } as unknown as T)
    );
  }

  return data as T;
}

export const http = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>("GET", path, undefined, init),

  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>("POST", path, body, init),

  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>("PATCH", path, body, init),

  delete: <T>(path: string, init?: RequestInit) =>
    request<T>("DELETE", path, undefined, init)
};
