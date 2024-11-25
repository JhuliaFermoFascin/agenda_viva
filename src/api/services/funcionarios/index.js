import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllFuncionarios = async () => {
    try {
      const response = await api.get(endpoints.getAllFuncionarios());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getFuncionarioById = async (funcionarioId) => {
    try {
      const response = await api.get(endpoints.getFuncionarioById(funcionarioId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createFuncionario = async (data) => {
  try {
    const response = await api.post(endpoints.addFuncionario(), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateFuncionario = async (funcionarioId, data) => {
  try {
    const response = await api.put(endpoints.updateFuncionario(funcionarioId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteFuncionario = async (funcionarioId) => {
  try {
    const response = await api.delete(endpoints.deleteFuncionario(funcionarioId));
    return response.data;
  } catch (error) {
    return error;
  }
}