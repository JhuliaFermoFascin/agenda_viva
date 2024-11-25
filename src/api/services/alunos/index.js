import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllAlunos = async () => {
    try {
      const response = await api.get(endpoints.getAllAlunos());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getAlunoById = async (alunoId) => {
    try {
      const response = await api.get(endpoints.getAlunoById(alunoId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createAluno = async (data) => {
  try {
    const response = await api.post(endpoints.addAluno(), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateAluno = async (alunoId, data) => {
  try {
    const response = await api.put(endpoints.updateAluno(alunoId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteAluno = async (alunoId) => {
  try {
    const response = await api.delete(endpoints.deleteAluno(alunoId));
    return response.data;
  } catch (error) {
    return error;
  }
}