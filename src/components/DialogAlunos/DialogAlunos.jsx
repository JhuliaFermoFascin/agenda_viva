import React, { useState } from "react";
import { parse, format, addDays } from "date-fns";

const DialogAlunos = ({
  open,
  onClose,
  onSave,
  aluno,
  setAluno,
  errorMessage,
}) => {
  if (!open) return null;

  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 10) {
      return onlyNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return onlyNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "data_nascimento") {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      if (!isNaN(parsedDate)) {
        const formattedDate = format(parsedDate, "yyyy-MM-dd");
        setAluno((prevAluno) => ({
          ...prevAluno,
          [field]: formattedDate,
        }));
      } else {
        setAluno((prevAluno) => ({
          ...prevAluno,
          [field]: value, 
        }));
      }
    } else {
      setAluno((prevAluno) => ({
        ...prevAluno,
        [field]: field === "contato_responsavel" ? formatPhoneNumber(value) : value,
      }));
    }
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
            value={aluno.data_nascimento ? format(addDays(new Date(aluno.data_nascimento), 1), 'yyyy-MM-dd') : ''}
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
            maxLength={15}
            onChange={(e) => handleInputChange("contato_responsavel", e.target.value)}
            className={`border rounded-lg py-2 px-4 text-sm w-full ${
              errorMessage.contato_responsavel ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMessage.contato_responsavel && (
            <p className="text-red-500 text-sm">{errorMessage.contato_responsavel}</p>
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
