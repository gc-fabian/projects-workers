import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

export function ProjectsListPage() {
  const { data, isLoading } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.items.length) return <div>No projects yet</div>;

  return (
    <div>
      {data.items.map((p) => (
        <div
          key={p.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <h3 style={{ margin: 0 }}>
            <Link to={`/projects/${p.id}`}>{p.name}</Link>
          </h3>
          <p style={{ margin: "6px 0 0 0" }}>{p.clientName}</p>
        </div>
      ))}
    </div>
  );
}
