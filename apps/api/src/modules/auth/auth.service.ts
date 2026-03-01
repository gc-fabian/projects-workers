import { InvalidCredentialsError } from "../../shared/errors/AppError";
import type { LoginBody } from "./auth.schemas";

export function login(body: LoginBody) {
  if (body.username !== "admin" || body.password !== "admin123") {
    throw new InvalidCredentialsError();
  }
  return { accessToken: "dev-token", tokenType: "Bearer", expiresIn: 3600 };
}
