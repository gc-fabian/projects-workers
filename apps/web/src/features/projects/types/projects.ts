export type ProjectResponseDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  workers: [];
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

export type WorkerDTO = {
  id: string;
  name: string;
  role: string;
  seniority: string;
};

export type ProjectDTO = {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  workers: WorkerDTO[];
};

export type ProjectsListDTO = {
  items: ProjectDTO[];
};
