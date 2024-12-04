import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";
import DialogEspecialidade from "../components/DialogEspecialidade/DialogEspecialidade";
import IconEditar from "../icon/icon-editar.svg";
import IconDeletar from "../icon/icon-deletar.svg";
import IconVoltar from "../icon/icon-voltar.svg";
import IconAvancar from "../icon/icon-avancar.svg";

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEspecialidade, setCurrentEspecialidade] = useState(null);
  const [newEspecialidade, setNewEspecialidade] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEspecialidades = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.getAllEspecialidades());
      setEspecialidades(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
      setError("Erro ao carregar especialidades.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEspecialidade = async () => {
    if (!newEspecialidade.trim()) {
      setErrorMessage("O nome da especialidade é obrigatório!");
      return;
    }
    const isDuplicate = especialidades.some(
      (esp) => esp.nome.toLowerCase() === newEspecialidade.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage("Já existe uma especialidade com este nome.");
      return;
    }

    try {
      const now = new Date().toISOString();
      if (isEditing && currentEspecialidade) {
        const response = await api.put(
          endpoints.updateEspecialidade(currentEspecialidade.id),
          {
            nome: newEspecialidade,
            updatedAt: now,
          }
        );
        setEspecialidades(
          especialidades.map((esp) =>
            esp.id === currentEspecialidade.id ? response.data : esp
          )
        );
      } else {
        const response = await api.post(endpoints.addEspecialidade(), {
          nome: newEspecialidade,
          createdAt: now,
          updatedAt: now,
        });
        setEspecialidades([...especialidades, response.data]);
      }
      setNewEspecialidade("");
      setIsEditing(false);
      setCurrentEspecialidade(null);
      setIsDialogOpen(false);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Erro ao salvar especialidade:", error);
      setError("Erro ao salvar especialidade.");
    }
  };
  const handleDeleteEspecialidade = async (id) => {
    try {
      await api.delete(endpoints.deleteEspecialidade(id));
      setEspecialidades(especialidades.filter((esp) => esp.id !== id));
    } catch (error) {
      console.error("Erro ao excluir especialidade:", error);
      alert("Erro ao excluir especialidade.");
    }
  };
  const handleEditEspecialidade = (especialidade) => {
    setCurrentEspecialidade(especialidade);
    setNewEspecialidade(especialidade.nome);
    setIsEditing(true);
    setIsDialogOpen(true);
    setErrorMessage(""); 
  };

  const totalPages = Math.ceil(especialidades.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedEspecialidades = especialidades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="flex-1 p-6 transition-all duration-300 flex flex-col bg-gray-100 h-screen">
        <h1 className="mt-16 text-2xl font-bold mb-6 text-[#023047]">
          Cadastro de Especialidade
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setNewEspecialidade("");
                setIsEditing(false);
                setIsDialogOpen(true);
                setErrorMessage("");
              }}
              className="bg-[#FFB703] text-white px-6 py-2 rounded-lg hover:bg-[#77c5e9]"
            >
              + Especialidade
            </button>
          </div>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="mt-10 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-4 border-gray-200">
                  <th className="py-2 px-4 text-[#8ecae6] text-left">ID</th>
                  <th className="py-2 px-4 text-[#8ecae6] text-left">Nome</th>
                  <th className="py-2 px-4 text-[#8ecae6] text-left">
                    Criado em
                  </th>
                  <th className="py-2 px-4 text-[#8ecae6] text-left">
                    Atualizado em
                  </th>
                  <th className="py-2 px-4 text-[#8ecae6] text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEspecialidades.map((especialidade) => (
                  <tr
                    key={especialidade.id}
                    className="hover:bg-gray-100 border-b-2 border-gray-200"
                  >
                    <td className="py-2 px-4">{especialidade.id}</td>
                    <td className="py-2 px-4">{especialidade.nome}</td>
                    <td className="py-2 px-4">
                      {new Date(especialidade.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(especialidade.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 text-right flex justify-end gap-2">
                      <button onClick={() => handleEditEspecialidade(especialidade)}>
                        <IconEditar />
                      </button>
                      <button
                        onClick={() => handleDeleteEspecialidade(especialidade.id)}
                      >
                        <IconDeletar />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-gray-400">
              Total de {especialidades.length} registros
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                <IconVoltar />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-gray-300 font-bold"
                      : "bg-gray-100 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                <IconAvancar />
              </button>
            </div>
          </div>
        </div>
        <DialogEspecialidade
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddEspecialidade}
          especialidade={newEspecialidade}
          setEspecialidade={setNewEspecialidade}
          errorMessage={errorMessage} 
        />
      </main>
    </>
  );
}
