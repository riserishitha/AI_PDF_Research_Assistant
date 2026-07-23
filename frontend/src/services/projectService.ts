import api from "../api/axios";
import type { Project } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (
  data: {
    name: string;
    description: string;
  }
): Promise<Project> => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data;
};

export const deleteProject = async (
  projectId: string
) => {
  await api.delete(`/projects/${projectId}`);
};