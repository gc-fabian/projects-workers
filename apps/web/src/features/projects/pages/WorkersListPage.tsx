import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkers } from "../hooks/useWorkers";
import {
  useCreateWorker,
  useDeleteWorker,
  useUpdateWorker
} from "../hooks/useWorkerMutations";
import { WorkerModal } from "../components/WorkerModal";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isApiErrorResponse, type WorkerDTO } from "../types/projects";
import type { WorkerFormValues } from "../schemas/workerForm.schema";

type WorkerModalState =
  | { mode: "create"; worker: null }
  | { mode: "edit"; worker: WorkerDTO }
  | null;

export function WorkersListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useWorkers();

  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();

  const [modalState, setModalState] = useState<WorkerModalState>(null);
  const [submitError, setSubmitError] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workers</div>;

  const workers = data?.items ?? [];

  async function handleCreate(values: WorkerFormValues) {
    setSubmitError("");

    try {
      await createWorker.mutateAsync(values);
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not create worker.");
    }
  }

  async function handleUpdate(values: WorkerFormValues) {
    if (!modalState || modalState.mode !== "edit") return;

    setSubmitError("");

    try {
      await updateWorker.mutateAsync({
        workerId: modalState.worker.id,
        data: values
      });
      setModalState(null);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      setSubmitError("Could not update worker.");
    }
  }

  async function handleDelete(workerId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );
    if (!confirmed) return;

    try {
      await deleteWorker.mutateAsync(workerId);
    } catch (error: unknown) {
      if (isApiErrorResponse(error) && error.error.code === "UNAUTHORIZED") {
        navigate("/login", { state: { from: "/workers" } });
        return;
      }

      window.alert("Could not delete worker.");
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
        <h2 style={{ margin: 0 }}>Workers</h2>

        {isAuthenticated ? (
          <button
            onClick={() => setModalState({ mode: "create", worker: null })}
          >
            Create worker
          </button>
        ) : (
          <button
            onClick={() => navigate("/login", { state: { from: "/workers" } })}
          >
            Login to create
          </button>
        )}
      </div>

      {!workers.length ? <div>No workers yet</div> : null}

      {workers.map((worker) => (
        <div
          key={worker.id}
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
              <h3 style={{ margin: 0 }}>{worker.name}</h3>
              <p style={{ margin: "6px 0 0 0" }}>{worker.role}</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
                {worker.seniority}
              </p>
            </div>

            {isAuthenticated ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModalState({ mode: "edit", worker })}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(worker.id)}
                  disabled={deleteWorker.isPending}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <WorkerModal
        isOpen={modalState !== null}
        mode={modalState?.mode ?? "create"}
        initialValues={
          modalState?.mode === "edit"
            ? {
                name: modalState.worker.name,
                role: modalState.worker.role,
                seniority: modalState.worker.seniority
              }
            : undefined
        }
        isSubmitting={createWorker.isPending || updateWorker.isPending}
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
