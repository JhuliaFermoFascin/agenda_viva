import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";
import DialogAlunos from "../components/DialogAlunos/DialogAlunos";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addDays, format } from 'date-fns';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAluno, setCurrentAluno] = useState(null);
  const [newAluno, setNewAluno] = useState({
    nome: "",
    data_nascimento: "",
    contato_responsavel: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.getAllAlunos());
      setAlunos(response.data || []);
      setFilteredAlunos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      setError("Erro ao carregar alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAlunos(
      alunos.filter((aluno) =>
        aluno.nome.toLowerCase().includes(query)
      )
    );
  };

  const validateAluno = () => {
    const errors = {};
    if (!newAluno.nome.trim()) {
      errors.nome = "O nome do aluno é obrigatório!";
    }
    if (!newAluno.data_nascimento) {
      errors.data_nascimento = "A data de nascimento é obrigatória!";
    }
    if (!newAluno.contato_responsavel.trim()) {
      errors.contato_responsavel = "O contato do responsável é obrigatório!";
    }

    setErrorMessage(errors);
    return Object.keys(errors).length === 0; 
  };

  const saveAluno = async () => {
    if (!validateAluno()) {
      return;
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();

      if (isEditing && currentAluno) {
        const response = await api.put(endpoints.updateAluno(currentAluno.id), {
          ...newAluno,
          updatedAt: now,
        });

        setAlunos((prevAlunos) =>
          prevAlunos.map((aluno) =>
            aluno.id === currentAluno.id ? response.data : aluno
          )
        );
        setFilteredAlunos((prevAlunos) =>
          prevAlunos.map((aluno) =>
            aluno.id === currentAluno.id ? response.data : aluno
          )
        );
      } else {
        const response = await api.post(endpoints.addAluno(), {
          ...newAluno,
          createdAt: now,
          updatedAt: now,
        });

        fetchAlunos();
      }

      setNewAluno({
        nome: "",
        data_nascimento: "",
        contato_responsavel: "",
      });
      setIsEditing(false);
      setCurrentAluno(null);
      setIsDialogOpen(false);
      setErrorMessage({});
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      setError("Erro ao salvar aluno.");
    } finally {
      setLoading(false);
    }
  };

  const openAddAlunoDialog = () => {
    setNewAluno({
      nome: "",
      data_nascimento: "",
      contato_responsavel: "",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
    setErrorMessage({});
  };

  const openEditAlunoDialog = (aluno) => {
    setCurrentAluno(aluno);
    setNewAluno(aluno);
    setIsEditing(true);
    setIsDialogOpen(true);
    setErrorMessage({});
  };

  const handleDeleteAluno = async (id) => {
    try {
      setLoading(true);
      await api.delete(endpoints.deleteAluno(id));
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      setError("Erro ao excluir aluno.");
    } finally {
      setLoading(false);
    }
  };

  const paginatedAlunos = filteredAlunos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="flex-1 p-6 transition-all duration-300 flex flex-col bg-gray-100 h-screen mt-20">
        <h1 className="mt-16 text-2xl font-bold mb-6 text-[#023047] ml-80">
          Cadastro de Alunos
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto ml-80">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Pesquisar por nome"
              className="border rounded-lg py-2 px-4 text-sm w-full max-w-xs mr-4"
            />
            <button
              onClick={openAddAlunoDialog}
              className="bg-[#FFB703] text-white px-6 py-2 rounded-lg hover:bg-[#77c5e9]"
            >
              + Aluno
            </button>
          </div>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <table className="mt-10 w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-4 border-gray-200">
                    <th className="py-2 px-4 text-[#8ecae6] text-left">ID</th>
                    <th className="py-2 px-4 text-[#8ecae6] text-left">Nome</th>
                    <th className="py-2 px-4 text-[#8ecae6] text-left">
                      Data de Nascimento
                    </th>
                    <th className="py-2 px-4 text-[#8ecae6] text-left">
                      Contato do Responsável
                    </th>
                    <th className="py-2 px-4 text-[#8ecae6] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAlunos.map((aluno) => (
                    <tr
                      key={aluno.id}
                      className="hover:bg-gray-100 border-b-2 border-gray-200"
                    >
                      <td className="py-2 px-4">{aluno.id}</td>
                      <td className="py-2 px-4">{aluno.nome}</td>
                      <td className="py-2 px-4">
                        {aluno.data_nascimento ? format(addDays(new Date(aluno.data_nascimento), 1), 'dd/MM/yyyy') : 'Não informado.'}
                      </td>
                      <td className="py-2 px-4">{aluno.contato_responsavel}</td>
                      <td className="py-2 px-4 text-right flex justify-end gap-2">
                        <button onClick={() => openEditAlunoDialog(aluno)}>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteAluno(aluno.id)}>
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  Total de {filteredAlunos.length} registros
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === 1
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-300"
                    }`}
                  >
                    {"<"}
                  </button>
                  {Array.from(
                    { length: Math.ceil(filteredAlunos.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === i + 1
                            ? "bg-gray-300 font-bold"
                            : "bg-gray-100 hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(filteredAlunos.length / itemsPerPage)
                    }
                    className={`px-3 py-1 border rounded-md ${
                      currentPage ===
                      Math.ceil(filteredAlunos.length / itemsPerPage)
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-300"
                    }`}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogAlunos
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={saveAluno}
          aluno={newAluno}
          setAluno={setNewAluno}
          errorMessage={errorMessage}
        />
      </main>
    </>
  );
}
