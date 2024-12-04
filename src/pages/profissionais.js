import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import api from '@/api/apiBase';
import endpoints from '@/api/endPoints';
import DialogProfissionais from '../components/DialogProfissionais/DialogProfissionais';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filteredProfissionais, setFilteredProfissionais] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfissional, setCurrentProfissional] = useState(null);
  const [newProfissional, setNewProfissional] = useState({
    nome: '',
    id_especialidade: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar todos os profissionais do backend
  const fetchProfissionais = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.getAllFuncionarios());
      setProfissionais(response.data || []);
      setFilteredProfissionais(response.data || []); // Também atualiza a lista filtrada inicialmente
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      setError('Erro ao carregar profissionais.');
    } finally {
      setLoading(false);
    }
  };

  // Buscar todas as especialidades do backend
  const fetchEspecialidades = async () => {
    try {
      const response = await api.get(endpoints.getAllEspecialidades());
      setEspecialidades(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
    }
  };

  useEffect(() => {
    fetchProfissionais();
    fetchEspecialidades();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProfissionais(
      profissionais.filter((profissional) =>
        profissional.nome.toLowerCase().includes(query)
      )
    );
  };

  const handleAddProfissional = async () => {
    if (!newProfissional.nome.trim() || !newProfissional.id_especialidade) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();

      if (isEditing && currentProfissional) {
        const response = await api.put(
          endpoints.updateFuncionario(currentProfissional.id),
          {
            ...newProfissional,
            updatedAt: now,
          }
        );

        setProfissionais((prevProfissionais) =>
          prevProfissionais.map((profissional) =>
            profissional.id === currentProfissional.id ? response.data : profissional
          )
        );
        setFilteredProfissionais((prevProfissionais) =>
          prevProfissionais.map((profissional) =>
            profissional.id === currentProfissional.id ? response.data : profissional
          )
        );
      } else {
        const response = await api.post(endpoints.addFuncionario(), {
          ...newProfissional,
          createdAt: now,
          updatedAt: now,
        });

        // Atualiza a lista de profissionais
        fetchProfissionais();
      }

      // Limpar estados
      setNewProfissional({
        nome: '',
        id_especialidade: '',
      });
      setIsEditing(false);
      setCurrentProfissional(null);
      setIsDialogOpen(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao salvar profissional:', error);
      setError('Erro ao salvar profissional.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfissional = (profissional) => {
    setCurrentProfissional(profissional);
    setNewProfissional({
      nome: profissional.nome,
      id_especialidade: profissional.id_especialidade,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
    setErrorMessage('');
  };

  const handleDeleteProfissional = async (id) => {
    try {
      setLoading(true);
      await api.delete(endpoints.deleteFuncionario(id));
      fetchProfissionais();
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      setError('Erro ao excluir profissional.');
    } finally {
      setLoading(false);
    }
  };

  const paginatedProfissionais = filteredProfissionais.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="flex-1 p-6 transition-all duration-300 flex flex-col bg-gray-100 h-screen">
        <h1 className="mt-16 text-2xl font-bold mb-6 text-[#023047]">
          Cadastro de Profissionais
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Pesquisar por nome"
              className="border rounded-lg py-2 px-4 text-sm w-full max-w-xs mr-4"
            />
            <button
              onClick={() => {
                setNewProfissional({
                  nome: '',
                  id_especialidade: '',
                });
                setIsEditing(false);
                setIsDialogOpen(true);
                setErrorMessage('');
              }}
              className="bg-[#FFB703] text-white px-6 py-2 rounded-lg hover:bg-[#77c5e9]"
            >
              + Profissional
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
                    <th className="py-2 px-4 text-[#8ecae6] text-left">Especialidade</th>
                    <th className="py-2 px-4 text-[#8ecae6] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProfissionais.map((profissional) => (
                    <tr
                      key={profissional.id}
                      className="hover:bg-gray-100 border-b-2 border-gray-200"
                    >
                      <td className="py-2 px-4">{profissional.id}</td>
                      <td className="py-2 px-4">{profissional.nome}</td>
                      <td className="py-2 px-4">
                        {
                          especialidades.find(
                            (especialidade) => especialidade.id === profissional.id_especialidade
                          )?.nome || 'Desconhecido'
                        }
                      </td>
                      <td className="py-2 px-4 text-right flex justify-end gap-2">
                        <button onClick={() => handleEditProfissional(profissional)}>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteProfissional(profissional.id)}>
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  Total de {filteredProfissionais.length} registros
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-300'
                    }`}
                  >
                    {'<'}
                  </button>
                  {Array.from(
                    { length: Math.ceil(filteredProfissionais.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === i + 1
                            ? 'bg-gray-300 font-bold'
                            : 'bg-gray-100 hover:bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredProfissionais.length / itemsPerPage)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === Math.ceil(filteredProfissionais.length / itemsPerPage)
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-300'
                    }`}
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogProfissionais
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddProfissional}
          profissional={newProfissional}
          setProfissional={setNewProfissional}
          errorMessage={errorMessage}
          especialidades={especialidades}
        />
      </main>
    </>
  );
}
