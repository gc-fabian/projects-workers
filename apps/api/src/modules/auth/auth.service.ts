import { InvalidCredentialsError } from "../../shared/errors/AppError.js";
import type { LoginBody } from "./auth.schemas.js";

const AUTH_USERNAME = "admin";
const AUTH_PASSWORD = "admin123";
const AUTH_ACCESS_TOKEN = "dev-token";
const AUTH_TOKEN_TYPE = "Bearer" as const;
const AUTH_EXPIRES_IN = 3600;

export function login(body: LoginBody) {
  if (body.username !== AUTH_USERNAME || body.password !== AUTH_PASSWORD) {
    throw new InvalidCredentialsError();
  }

  return {
    accessToken: AUTH_ACCESS_TOKEN,
    tokenType: AUTH_TOKEN_TYPE,
    expiresIn: AUTH_EXPIRES_IN
  };
}

export function isValidAccessToken(token: string) {
  return token === AUTH_ACCESS_TOKEN;
}
