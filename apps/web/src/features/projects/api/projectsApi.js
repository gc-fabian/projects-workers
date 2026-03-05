import { http } from "@/shared/api/http";
export const projectsApi = {
  list: () => http.get("/projects"),
  getById: (id) => http.get(`/projects/${id}`),
  create: (data) => http.post("/projects", data),
  update: (id, data) => http.patch(`/projects/${id}`, data),
  remove: (id) => http.delete(`/projects/${id}`)
};
