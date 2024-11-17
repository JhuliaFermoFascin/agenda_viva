import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllFuncionarios = async () => {
    try {
      return await api.get(endpoints.getAllFuncionarios());
    } catch (error) {
      console.error('Erro ao buscar os funcionarios:', error);
      throw error;
    }
};

export const getFuncionarioById = async (funcionarioId) => {
    try {
      return await api.get(endpoints.getFuncionarioById(funcionarioId));
    } catch (error) {
      console.error('Erro ao buscar funcionario: ', error);
      throw error;
    }
}

export const createFuncionario = async () => {
  try {
    return await api.post(endpoints.addFuncionario());
  } catch (error) {
    console.error('Erro ao criar funcionario: ', error);
  }
}

export const updateFuncionario = async () => {
  try {
    return await api.put(endpoints.updateFuncionario());
  } catch (error) {
    console.error('Erro ao atualizar funcionario: ', error);
  }
}

export const deleteFuncionario = async () => {
  try {
    return await api.delete(endpoints.deleteFuncionario());
  } catch (error) {
    console.error('Erro ao remover funcionario: ', error);
  }
}