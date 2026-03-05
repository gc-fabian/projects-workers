import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProjectsListPage } from "./features/projects/pages/ProjectsListPage";
export function App() {
  return _jsx(BrowserRouter, {
    children: _jsxs("div", {
      style: { fontFamily: "system-ui", padding: 16 },
      children: [
        _jsx("nav", {
          style: { display: "flex", gap: 12, marginBottom: 16 },
          children: _jsx(Link, { to: "/projects", children: "Projects" })
        }),
        _jsxs(Routes, {
          children: [
            _jsx(Route, {
              path: "/",
              element: _jsx(Navigate, { to: "/projects", replace: true })
            }),
            _jsx(Route, {
              path: "/projects",
              element: _jsx(ProjectsListPage, {})
            })
          ]
        })
      ]
    })
  });
}
