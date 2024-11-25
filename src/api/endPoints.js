const endpoints = {
    // ALUNOS
    getAllAlunos: () => `/alunos`,
    getAlunoById: (alunoId) => `/alunos/${alunoId}`,
    addAluno: () => `/alunos`,
    updateAluno: (alunoId) => `/alunos/${alunoId}`,
    deleteAluno: (alunoId) => `/alunos/${alunoId}`,

    // AGENDAMENTOS
    getAllAgendamentos: () => `/agendamentos`,
    getAgendamentoById: (agendamentoId) => `/agendamentos/${agendamentoId}`,
    addAgendamento: () => `/agendamentos`,
    updateAgendamento: (agendamentoId) => `/agendamentos/${agendamentoId}`,
    deleteAgendamento: (agendamentoId) => `/agendamentos/${agendamentoId}`,

    // FUNCIONARIOS
    getAllFuncionarios: () => `/funcionarios`,
    getFuncionarioById: (funcionarioId) => `/funcionarios/${funcionarioId}`,
    addFuncionario: () => `/funcionarios`,
    updateFuncionario: (funcionarioId) => `/funcionarios/${funcionarioId}`,
    deleteFuncionario: (funcionarioId) => `/funcionarios/${funcionarioId}`,

    // USUARIOS
    getAllUsuarios: () => `/usuarios`,
    getUsuarioById: (usuarioId) => `/usuarios/${usuarioId}`,
    addUsuario: () => `/usuarios`,
    updateUsuario: (usuarioId) => `/usuarios/${usuarioId}`,
    deleteUsuario: (usuarioId) => `/usuarios/${usuarioId}`,

    // ESPECIALIDADES
    getAllEspecialidades: () => `/especialidades`,
    getEspecialidadeById: (especialidadeId) => `/especialidades/${especialidadeId}`,
    addEspecialidade: () => `/especialidades`,
    updateEspecialidade: (especialidadeId) => `/especialidades/${especialidadeId}`,
    deleteEspecialidade: (especialidadeId) => `/especialidades/${especialidadeId}`,
  };
  
export default endpoints;