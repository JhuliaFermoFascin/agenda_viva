// components/TabelaAlunos.js
import React, { useEffect, useState } from 'react';
import { getAlunos } from '../api/services/alunos';
import { FaPen, FaTrash, FaSearch, FaFemale, FaMale } from 'react-icons/fa';

const TabelaAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const data = await getAlunos();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm)
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Cadastro de alunos</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            + Aluno
          </button>
        </div>
        <div className="flex items-center justify-end mb-4">
          <input
            type="text"
            placeholder="Pesquise por nome ou CPF"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-3 py-2 mr-2"
          />
          <FaSearch className="text-gray-500" />
        </div>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Aluno</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Responsável</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Contato</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Data Nasc.</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">CPF</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Sexo</th>
              <th className="border-b-2 py-3 px-4 text-gray-600 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.length > 0 ? (
              filteredAlunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="border-b py-3 px-4 text-gray-700">{aluno.nome}</td>
                  <td className="border-b py-3 px-4 text-gray-700">{aluno.responsavel}</td>
                  <td className="border-b py-3 px-4 text-gray-700">{aluno.contato_responsavel}</td>
                  <td className="border-b py-3 px-4 text-gray-700">{aluno.data_nascimento}</td>
                  <td className="border-b py-3 px-4 text-gray-700">{aluno.cpf}</td>
                  <td className="border-b py-3 px-4 text-gray-700">
                    {aluno.sexo === 'F' ? (
                      <FaFemale className="text-pink-500" />
                    ) : (
                      <FaMale className="text-blue-500" />
                    )}
                  </td>
                  <td className="border-b py-3 px-4 text-gray-700 flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaPen />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Nenhum aluno encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Total de {filteredAlunos.length} registros</span>
          {/* Aqui você pode implementar paginação se for necessário */}
        </div>
      </div>
    </div>
  );
};

export default TabelaAlunos;
