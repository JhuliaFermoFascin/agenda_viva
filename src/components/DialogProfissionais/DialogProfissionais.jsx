import React from 'react';

const DialogProfissionais = ({
  open,
  onClose,
  onSave,
  profissional,
  setProfissional,
  especialidades,
  errorMessage,
}) => {
  if (!open) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {profissional?.id ? 'Editar Profissional' : 'Adicionar Profissional'}
        </h2>
        <form className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
          <input
            type="text"
            placeholder="Nome do profissional"
            value={profissional.nome}
            onChange={(e) => setProfissional({ ...profissional, nome: e.target.value })}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <select
            value={profissional.id_especialidade}
            onChange={(e) => setProfissional({ ...profissional, id_especialidade: e.target.value })}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione a especialidade</option>
            {especialidades.map((especialidade) => (
              <option key={especialidade.id} value={especialidade.id}>
                {especialidade.nome}
              </option>
            ))}
          </select>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              type="button"
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

export default DialogProfissionais;
