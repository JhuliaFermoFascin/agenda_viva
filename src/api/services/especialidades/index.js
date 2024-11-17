import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllEspecialidades = async () => {
    try {
      return await api.get(endpoints.getAllEspecialidades());
    } catch (error) {
      console.error('Erro ao buscar os especialidades:', error);
      throw error;
    }
};

export const getEspecialidadeById = async (especialidadeId) => {
    try {
      return await api.get(endpoints.getEspecialidadeById(especialidadeId));
    } catch (error) {
      console.error('Erro ao buscar especialidade: ', error);
      throw error;
    }
}

export const createEspecialidade = async () => {
  try {
    return await api.post(endpoints.addEspecialidade());
  } catch (error) {
    console.error('Erro ao criar especialidade: ', error);
  }
}

export const updateEspecialidade = async () => {
  try {
    return await api.put(endpoints.updateEspecialidade());
  } catch (error) {
    console.error('Erro ao atualizar especialidade: ', error);
  }
}

export const deleteEspecialidade = async () => {
  try {
    return await api.delete(endpoints.deleteEspecialidade());
  } catch (error) {
    console.error('Erro ao remover especialidade: ', error);
  }
}