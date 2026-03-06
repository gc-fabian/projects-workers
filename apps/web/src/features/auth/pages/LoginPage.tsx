import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { isAuthErrorResponse } from "../types/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginLocationState = {
  from?: string;
};

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState("");

  const from =
    ((location.state as LoginLocationState | null)?.from ?? "/projects") ||
    "/projects";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  async function onSubmit(values: LoginFormValues) {
    setSubmitError("");

    try {
      await login(values);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (
        isAuthErrorResponse(error) &&
        error.error.code === "INVALID_CREDENTIALS"
      ) {
        setSubmitError("Credenciales inválidas.");
        return;
      }

      if (
        isAuthErrorResponse(error) &&
        error.error.code === "VALIDATION_ERROR"
      ) {
        setSubmitError("Debes completar username y password.");
        return;
      }

      setSubmitError("No se pudo iniciar sesión.");
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 12 }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="username">Username</label>
          <input id="username" {...register("username")} />
          {errors.username ? (
            <span style={{ color: "crimson" }}>{errors.username.message}</span>
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password ? (
            <span style={{ color: "crimson" }}>{errors.password.message}</span>
          ) : null}
        </div>

        {submitError ? (
          <div style={{ color: "crimson" }}>{submitError}</div>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
