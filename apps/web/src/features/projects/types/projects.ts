export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
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

export function isApiErrorResponse(e: unknown): e is ApiErrorResponseDTO {
  if (!e || typeof e !== "object") return false;
  if (!("error" in e)) return false;

  const maybeError = (e as { error?: unknown }).error;
  if (!maybeError || typeof maybeError !== "object") return false;

  return typeof (maybeError as { code?: unknown }).code === "string";
}
