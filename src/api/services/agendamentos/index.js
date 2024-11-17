import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllAgendamentos = async () => {
    try {
      return await api.get(endpoints.getAllAgendamentos());
    } catch (error) {
      console.error('Erro ao buscar os agendamentos:', error);
      throw error;
    }
};

export const getAgendamentoById = async (agendamentoId) => {
    try {
      return await api.get(endpoints.getAgendamentoById(agendamentoId));
    } catch (error) {
      console.error('Erro ao buscar agendamento: ', error);
      throw error;
    }
}

export const createAgendamento = async () => {
  try {
    return await api.post(endpoints.addAgendamento());
  } catch (error) {
    console.error('Erro ao criar agendamento: ', error);
  }
}

export const updateAgendamento = async () => {
  try {
    return await api.put(endpoints.updateAgendamento());
  } catch (error) {
    console.error('Erro ao atualizar agendamento: ', error);
  }
}

export const deleteAgendamento = async () => {
  try {
    return await api.delete(endpoints.deleteAgendamento());
  } catch (error) {
    console.error('Erro ao remover agendamento: ', error);
  }
}