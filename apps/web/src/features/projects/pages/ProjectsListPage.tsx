import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject
} from "../hooks/useProjectMutations";
import { ProjectModal } from "../components/ProjectModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type ProjectResponseDTO } from "../types/projects";
import type { ProjectFormValues } from "../schemas/projectForm.schema";

type ProjectModalState =
  | { mode: "create"; project: null }
  | { mode: "edit"; project: ProjectResponseDTO }
  | null;

export function ProjectsListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useProjects();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [modalState, setModalState] = useState<ProjectModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const projects = data?.items ?? [];

  async function handleCreate(values: ProjectFormValues) {
    setSubmitError("");

    try {
      await createProject.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not create project.");
    }
  }

  async function handleUpdate(values: ProjectFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateProject.mutateAsync({
        projectId: modalState.project.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      if (
        isApiErrorResponse(error) &&
        error.error.code === "PROJECT_ALREADY_EXISTS"
      ) {
        setSubmitError(
          "A project with the same name, client and date already exists."
        );
        return;
      }

      setSubmitError("Could not update project.");
    }
  }

  async function handleDelete(projectId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProject.mutateAsync(projectId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/projects" } });
        return;
      }

      window.alert("Could not delete project.");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16
        }}
      >
        <h2 style={{ margin: 0 }}>Projects</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", project: null })}
          >
            Create project
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/projects" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!projects.length ? <div>No projects yet</div> : null}

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 12
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <p style={{ margin: "6px 0 0 0" }}>{project.clientName}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {project.startDate}{" "}
                {project.endDate ? `→ ${project.endDate}` : ""}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setModalState({ mode: "edit", project })}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deleteProject.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <ProjectModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.project.name,
                clientName: modalState.project.clientName,
                startDate: modalState.project.startDate,
                endDate: modalState.project.endDate
              }
            : undefined
        }
        isSubmitting={createProject.isPending || updateProject.isPending}
        errorMessage={submitError}
        onClose={() => {
          setModalState(null);
          setSubmitError("");
        }}
        onSubmit={modalState?.mode === "edit" ? handleUpdate : handleCreate}
      />
    </div>
  );
}
