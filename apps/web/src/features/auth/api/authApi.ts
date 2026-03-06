import { http } from "@/shared/api/http";
import type { LoginRequestDTO, LoginResponseDTO } from "../types/auth";

export const authApi = {
  login: (data: LoginRequestDTO) =>
    http.post<LoginResponseDTO>("/auth/login", data)
};
