import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllEspecialidades = async () => {
    try {
      const response = await api.get(endpoints.getAllEspecialidades());
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar os especialidades:', error);
      throw error;
    }
};

export const getEspecialidadeById = async (especialidadeId) => {
    try {
      const response = await api.get(endpoints.getEspecialidadeById(especialidadeId));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar especialidade: ', error);
      throw error;
    }
}

export const createEspecialidade = async (data) => {
  try {
    const response = await api.post(endpoints.addEspecialidade(), data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar especialidade: ', error);
  }
}

export const updateEspecialidade = async (especialidadeId, data) => {
  try {
    const response = await api.put(endpoints.updateEspecialidade(especialidadeId), data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar especialidade: ', error);
  }
}

export const deleteEspecialidade = async (especialidadeId) => {
  try {
    const response = await api.delete(endpoints.deleteEspecialidade(especialidadeId));
    return response.data;
  } catch (error) {
    console.error('Erro ao remover especialidade: ', error);
  }
}