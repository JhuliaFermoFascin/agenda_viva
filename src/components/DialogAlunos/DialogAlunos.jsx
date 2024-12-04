import React from "react";

const DialogAlunos = ({
  open,
  onClose,
  onSave,
  aluno,
  setAluno,
  errorMessage,
}) => {
  if (!open) return null;

  const handleInputChange = (field, value) => {
    setAluno((prevAluno) => ({
      ...prevAluno,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {aluno?.id ? "Editar Aluno" : "Adicionar Aluno"}
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do aluno"
            value={aluno.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage.nome ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMessage.nome && (
            <p className="text-red-500 text-sm">{errorMessage.nome}</p>
          )}

          <input
            type="date"
            placeholder="Data de Nascimento"
            value={aluno.data_nascimento}
            onChange={(e) => handleInputChange("data_nascimento", e.target.value)}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage.data_nascimento ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMessage.data_nascimento && (
            <p className="text-red-500 text-sm">{errorMessage.data_nascimento}</p>
          )}

          <input
            type="text"
            placeholder="Contato do responsável"
            value={aluno.contato_responsavel}
            onChange={(e) => handleInputChange("contato_responsavel", e.target.value)}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage.contato_responsavel ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMessage.contato_responsavel && (
            <p className="text-red-500 text-sm">{errorMessage.contato_responsavel}</p>
          )}

          <select
            value={aluno.sexo}
            onChange={(e) => handleInputChange("sexo", e.target.value)}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage.sexo ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione o sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
          {errorMessage.sexo && (
            <p className="text-red-500 text-sm">{errorMessage.sexo}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 bg-[#FFB703] text-white rounded-lg hover:bg-[#77c5e9]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DialogAlunos;
