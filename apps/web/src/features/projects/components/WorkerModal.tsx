import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workerFormSchema,
  type WorkerFormValues
} from "../schemas/workerForm.schema";

type WorkerModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<WorkerFormValues>;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (values: WorkerFormValues) => Promise<void>;
};

const emptyValues: WorkerFormValues = {
  name: "",
  role: "",
  seniority: "junior"
};

export function WorkerModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit
}: WorkerModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WorkerFormValues>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: emptyValues
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialValues?.name ?? "",
      role: initialValues?.role ?? "",
      seniority: initialValues?.seniority ?? "junior"
    });
  }, [initialValues, isOpen, reset]);

  if (!isOpen) return null;

  return (
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
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: 520,
          maxWidth: "100%",
          borderRadius: 12,
          padding: 16
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "create" ? "Create worker" : "Edit worker"}
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-name">Name</label>
            <input id="worker-name" {...register("name")} />
            {errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-role">Role</label>
            <input id="worker-role" {...register("role")} />
            {errors.role ? (
              <span style={{ color: "crimson" }}>{errors.role.message}</span>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="worker-seniority">Seniority</label>
            <select id="worker-seniority" {...register("seniority")}>
              <option value="junior">junior</option>
              <option value="semi-senior">semi-senior</option>
              <option value="senior">senior</option>
            </select>
            {errors.seniority ? (
              <span style={{ color: "crimson" }}>
                {errors.seniority.message}
              </span>
            ) : null}
          </div>

          {errorMessage ? (
            <div style={{ color: "crimson" }}>{errorMessage}</div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
