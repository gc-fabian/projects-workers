const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
async function request(method, path, body, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw (
      data ?? {
        error: { code: "HTTP_ERROR", message: `HTTP ${res.status}` }
      }
    );
  }
  return data;
}
export const http = {
  get: (path, init) => request("GET", path, undefined, init),
  post: (path, body, init) => request("POST", path, body, init),
  patch: (path, body, init) => request("PATCH", path, body, init),
  delete: (path, init) => request("DELETE", path, undefined, init)
};
