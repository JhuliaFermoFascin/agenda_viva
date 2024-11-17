import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllAlunos = async () => {
    try {
      return await api.get(endpoints.getAllAlunos());
    } catch (error) {
      console.error('Erro ao buscar os alunos:', error);
      throw error;
    }
};

export const getAlunoById = async (alunoId) => {
    try {
      return await api.get(endpoints.getAlunoById(alunoId));
    } catch (error) {
      console.error('Erro ao buscar aluno: ', error);
      throw error;
    }
}

export const createAluno = async () => {
  try {
    return await api.post(endpoints.addAluno());
  } catch (error) {
    console.error('Erro ao criar aluno: ', error);
  }
}

export const updateAluno = async () => {
  try {
    return await api.put(endpoints.updateAluno());
  } catch (error) {
    console.error('Erro ao atualizar aluno: ', error);
  }
}

export const deleteAluno = async () => {
  try {
    return await api.delete(endpoints.deleteAluno());
  } catch (error) {
    console.error('Erro ao remover aluno: ', error);
  }
}