import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllUsuarios = async () => {
    try {
      return await api.get(endpoints.getAllUsuarios());
    } catch (error) {
      console.error('Erro ao buscar os usuarios:', error);
      throw error;
    }
};

export const getUsuarioById = async (usuarioId) => {
    try {
      return await api.get(endpoints.getUsuarioById(usuarioId));
    } catch (error) {
      console.error('Erro ao buscar usuario: ', error);
      throw error;
    }
}

export const createUsuario = async () => {
  try {
    return await api.post(endpoints.addUsuario());
  } catch (error) {
    console.error('Erro ao criar usuario: ', error);
  }
}

export const updateUsuario = async () => {
  try {
    return await api.put(endpoints.updateUsuario());
  } catch (error) {
    console.error('Erro ao atualizar usuario: ', error);
  }
}

export const deleteUsuario = async () => {
  try {
    return await api.delete(endpoints.deleteUsuario());
  } catch (error) {
    console.error('Erro ao remover usuario: ', error);
  }
}