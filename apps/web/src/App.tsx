import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";

export function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "system-ui", padding: 16 }}>
        <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Link to="/projects">Projects</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          {/* después agregas: <Route path="/projects/:projectId" ... /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
