import { useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import { useWorkers } from "../hooks/useWorkers";
import {
  useAssignWorker,
  useUnassignWorker
} from "../hooks/useProjectAssignments";
import type { WorkerDTO } from "../types/projects";
import { isApiErrorResponse } from "../types/projects";
import { useAuth } from "@/features/auth/context/AuthContext";

export function ProjectDetailPage() {
  const { projectId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: project, isLoading, error } = useProjectById(projectId);
  const { data: workersList } = useWorkers();
  const assign = useAssignWorker();
  const unassign = useUnassignWorker();

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [assignErrorMsg, setAssignErrorMsg] = useState<string>("");
  const [actionMessage, setActionMessage] = useState<string>("");

  const assignedIds = useMemo(
    () => new Set((project?.workers ?? []).map((worker) => worker.id)),
    [project]
  );

  const availableWorkers: WorkerDTO[] = useMemo(() => {
    const allWorkers = workersList?.items ?? [];
    return allWorkers.filter((worker) => !assignedIds.has(worker.id));
  }, [workersList, assignedIds]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project</div>;
  if (!project) return <div>Project not found</div>;

  function goToLoginWithReturn() {
    navigate("/login", {
      state: { from: location.pathname }
    });
  }

  async function onAssign() {
    if (!project) return;

    setAssignErrorMsg("");
    setActionMessage("");

    if (!isAuthenticated) {
      setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    if (!selectedWorkerId) return;

    const currentProjectId = project.id;

    try {
      await assign.mutateAsync({
        projectId: currentProjectId,
        workerId: selectedWorkerId
      });

      setIsAssignOpen(false);
      setSelectedWorkerId("");
    } catch (error: unknown) {
      if (
        isApiErrorResponse(error) &&
        error.error.code === "ASSIGNMENT_ALREADY_EXISTS"
      ) {
        setAssignErrorMsg("Este trabajador ya está asignado a este proyecto.");
        return;
      }

      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setAssignErrorMsg("Debes iniciar sesión para asignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setAssignErrorMsg("No se pudo asignar el trabajador.");
    }
  }

  async function onUnassign(workerId: string) {
    if (!project) return;

    setActionMessage("");

    if (!isAuthenticated) {
      setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
      goToLoginWithReturn();
      return;
    }

    const currentProjectId = project.id;

    try {
      await unassign.mutateAsync({
        projectId: currentProjectId,
        workerId
      });
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        setActionMessage("Debes iniciar sesión para desasignar trabajadores.");
        goToLoginWithReturn();
        return;
      }

      setActionMessage("No se pudo desasignar el trabajador.");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/projects">← Back</Link>
      </div>

      <h2 style={{ margin: 0 }}>{project.name}</h2>

      <p style={{ marginTop: 6 }}>
        <strong>Client:</strong> {project.clientName}
      </p>

      <p style={{ marginTop: 6 }}>
        <strong>Dates:</strong> {project.startDate}{" "}
        {project.endDate ? `→ ${project.endDate}` : ""}
      </p>

      {!isAuthenticated ? (
        <div style={{ marginTop: 12, color: "#555" }}>
          Debes iniciar sesión para gestionar asignaciones.
        </div>
      ) : null}

      {actionMessage ? (
        <div style={{ marginTop: 12, color: "crimson" }}>{actionMessage}</div>
      ) : null}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        <h3 style={{ margin: 0 }}>Assigned workers</h3>

        {isAuthenticated ? (
          <button onClick={() => setIsAssignOpen(true)}>Assign worker</button>
        ) : (
          <button onClick={goToLoginWithReturn}>Assign worker</button>
        )}
      </div>

      {!project.workers.length ? (
        <div style={{ marginTop: 12 }}>No workers assigned yet</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {project.workers.map((worker) => (
            <div
              key={worker.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{worker.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.8 }}>
                    {worker.role} · {worker.seniority}
                  </div>
                </div>

                {isAuthenticated ? (
                  <button
                    onClick={() => onUnassign(worker.id)}
                    disabled={unassign.isPending}
                    title="Unassign"
                  >
                    {unassign.isPending ? "..." : "Unassign"}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAssignOpen && isAuthenticated && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
          onClick={() => setIsAssignOpen(false)}
        >
          <div
            style={{
              background: "white",
              width: 480,
              maxWidth: "100%",
              borderRadius: 12,
              padding: 16
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Assign worker</h3>

            {!availableWorkers.length ? (
              <div style={{ marginBottom: 12 }}>
                No available workers to assign.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                <label style={{ fontSize: 14 }}>Worker</label>
                <select
                  value={selectedWorkerId}
                  onChange={(event) => setSelectedWorkerId(event.target.value)}
                >
                  <option value="">Select...</option>
                  {availableWorkers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} — {worker.role} ({worker.seniority})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {assignErrorMsg ? (
              <div style={{ color: "crimson", marginBottom: 12 }}>
                {assignErrorMsg}
              </div>
            ) : null}

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={() => setIsAssignOpen(false)}>Cancel</button>
              <button
                onClick={onAssign}
                disabled={
                  !selectedWorkerId ||
                  assign.isPending ||
                  !availableWorkers.length
                }
              >
                {assign.isPending ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
