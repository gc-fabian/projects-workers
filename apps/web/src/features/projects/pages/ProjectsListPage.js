import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProjects } from "../hooks/useProjects";
export function ProjectsListPage() {
  const { data, isLoading } = useProjects();
  if (isLoading) return _jsx("div", { children: "Loading..." });
  if (!data?.items.length) return _jsx("div", { children: "No projects yet" });
  return _jsx("div", {
    children: data.items.map((p) =>
      _jsxs(
        "div",
        {
          children: [
            _jsx("h3", { children: p.name }),
            _jsx("p", { children: p.clientName })
          ]
        },
        p.id
      )
    )
  });
}
