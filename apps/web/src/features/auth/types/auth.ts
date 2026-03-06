export type LoginRequestDTO = {
  username: string;
  password: string;
};

export type LoginResponseDTO = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
};

export type AuthErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
    requestId?: string;
  };
};

export function isAuthErrorResponse(
  value: unknown
): value is AuthErrorResponseDTO {
  if (!value || typeof value !== "object") return false;
  if (!("error" in value)) return false;

  const maybeError = (value as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
