import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllAlunos = async () => {
    try {
      const response = await api.get(endpoints.getAllAlunos());
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os alunos:', error);
      throw error;
    }
};

export const getAlunoById = async (alunoId) => {
    try {
      const response = await api.get(endpoints.getAlunoById(alunoId));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar aluno: ', error);
      throw error;
    }
}

export const createAluno = async (data) => {
  try {
    const response = await api.post(endpoints.addAluno(), data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar aluno: ', error);
  }
}

export const updateAluno = async (alunoId, data) => {
  try {
    const response = await api.put(endpoints.updateAluno(alunoId), data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar aluno: ', error);
  }
}

export const deleteAluno = async (alunoId) => {
  try {
    const response = await api.delete(endpoints.deleteAluno(alunoId));
    return response.data;
  } catch (error) {
    console.error('Erro ao remover aluno: ', error);
  }
}