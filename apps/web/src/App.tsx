import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
import { ProjectDetailPage } from "./features/projects/pages/ProjectDetailPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { useAuth } from "./features/auth/context/AuthContext";

function AppShell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center"
        }}
      >
        <Link to="/projects">Projects</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          {isAuthenticated ? (
            <>
              <span>Authenticated</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
