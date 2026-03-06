import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { authApi } from "../api/authApi";
import type { LoginRequestDTO } from "../types/auth";
import { setHttpAuthToken } from "@/shared/api/http";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "auth.token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  });

  useEffect(() => {
    setHttpAuthToken(token);
  }, [token]);

  const login = useCallback(async (data: LoginRequestDTO) => {
    const result = await authApi.login(data);
    setToken(result.accessToken);
    localStorage.setItem(AUTH_STORAGE_KEY, result.accessToken);
    setHttpAuthToken(result.accessToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setHttpAuthToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout
    }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
