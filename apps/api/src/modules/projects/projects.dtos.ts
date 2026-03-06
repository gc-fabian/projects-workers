export interface ProjectCreateDTO {
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectUpdateDTO {
  name?: string;
  clientName?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface ProjectListResponseDTO {
  items: ProjectResponseDTO[];
}

export type WorkerInProjectDTO = {
  id: string;
  name: string;
  role: string;
  seniority: "junior" | "semi-senior" | "senior";
};

export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerInProjectDTO[];
};
