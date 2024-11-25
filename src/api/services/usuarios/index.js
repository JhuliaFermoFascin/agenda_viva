import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllUsuarios = async () => {
    try {
      const response = await api.get(endpoints.getAllUsuarios());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getUsuarioById = async (usuarioId) => {
    try {
      const response = await api.get(endpoints.getUsuarioById(usuarioId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createUsuario = async (data) => {
  try {
    const response = await api.post(endpoints.addUsuario(), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateUsuario = async (usuarioId, data) => {
  try {
    const response = await api.put(endpoints.updateUsuario(usuarioId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteUsuario = async (usuarioId) => {
  try {
    const response = await api.delete(endpoints.deleteUsuario(usuarioId));
    return response.data;
  } catch (error) {
    return error;
  }
}