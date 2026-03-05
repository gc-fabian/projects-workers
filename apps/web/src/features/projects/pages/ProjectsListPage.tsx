import { useProjects } from "../hooks/useProjects";

export function ProjectsListPage() {
  const { data, isLoading } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.items.length) return <div>No projects yet</div>;

  return (
    <div>
      {data.items.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.clientName}</p>
        </div>
      ))}
    </div>
  );
}
