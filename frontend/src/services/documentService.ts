import api from "../api/axios";

export const uploadDocument = async (
  projectId: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/documents/upload/${projectId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments = async (
  projectId: string
) => {
  const response = await api.get(
    `/documents/project/${projectId}`
  );

  return response.data;
};