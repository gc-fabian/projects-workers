export type WorkerSeniorityDTO = "junior" | "semi-senior" | "senior";

export type WorkerCreateDTO = {
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerUpdateDTO = Partial<WorkerCreateDTO>;

export type WorkerResponseDTO = {
  id: string;
  name: string;
  role: string;
  seniority: WorkerSeniorityDTO;
};

export type WorkerListResponseDTO = { items: WorkerResponseDTO[] };
