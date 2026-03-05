const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });

  const data = (await res.json().catch(() => null)) as T | null;

  if (!res.ok) {
    throw (
      data ??
      ({
        error: { code: "HTTP_ERROR", message: `HTTP ${res.status}` }
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
