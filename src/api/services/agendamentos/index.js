import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllAgendamentos = async () => {
    try {
      const response = await api.get(endpoints.getAllAgendamentos());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getAgendamentoById = async (agendamentoId) => {
    try {
      const response = await api.get(endpoints.getAgendamentoById(agendamentoId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createAgendamento = async (data) => {
  try {
    const dataFormatada = {
      ...data,
      hora_inicio: `${data.data}T${data.hora_inicio}:00`,
      hora_fim: `${data.data}T${data.hora_fim}:00`
    }

    const response = await api.post(endpoints.addAgendamento(), dataFormatada);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateAgendamento = async (agendamentoId, data) => {
  try {
    const response = await api.put(endpoints.updateAgendamento(agendamentoId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteAgendamento = async (agendamentoId) => {
  try {
    const response = await api.delete(endpoints.deleteAgendamento(agendamentoId));
    return response.data;
  } catch (error) {
    return error;
  }
}