export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type WorkerCreateDTO = {
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerDTO[];
};

export type ProjectListResponseDTO = {
  items: ProjectResponseDTO[];
};

export type ProjectCreateDTO = {
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
};

export type ProjectUpdateDTO = Partial<ProjectCreateDTO>;

export type ApiErrorResponseDTO = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
    requestId?: string;
  };
};

export function isApiErrorResponse(
  error: unknown
): error is ApiErrorResponseDTO {
  if (!error || typeof error !== "object") return false;
  if (!("error" in error)) return false;

  const maybeError = (error as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
