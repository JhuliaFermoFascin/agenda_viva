import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getAllFuncionarios, updateFuncionario, createFuncionario, deleteFuncionario } from '@/api/services/funcionarios';
import { getAllEspecialidades } from '@/api/services/especialidades';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HealthProfessionalTable = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const [professionals, setProfessionals] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const handleOpenDialog = (professional = null) => {
    if (professional) {
      setCurrentProfessional(professional);
      setPayloadData({
        nome: professional.nome,
        id_especialidade: professional.id_especialidade || '',
      });
    } else {
      setCurrentProfessional({ nome: '', especialidade: '' });
      setPayloadData({ nome: '', id_especialidade: '' });
    }
    setEditMode(!!professional);
    setDialogOpen(true);
  };

  const [payloadData, setPayloadData] = useState({
    nome: '',
    id_especialidade: '',
  });


  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentProfessional(null);
  };

  const handleOpenDeleteDialog = (professional) => {
    setCurrentProfessional(professional);
    setDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpen(false);
    setCurrentProfessional(null);
  };

  const validate = () => {
    let tempErrors = {};
    if (!currentProfessional.nome) tempErrors.nome = 'Nome é obrigatório';
    else if (/\d/.test(currentProfessional.nome)) tempErrors.nome = 'Nome não pode conter números';

    if (!currentProfessional.especialidade) tempErrors.especialidade = 'Especialidade é obrigatória';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    const updatedProfessional = {
      id: currentProfessional?.id || null, // Garantir que o ID está presente no modo edição
      nome: payloadData.nome,
      id_especialidade: payloadData.id_especialidade,
    };
  
    if (editMode) {
      // Atualizar um profissional existente
      try {
        await updateFuncionario(updatedProfessional); // Atualizar na API
        setProfessionals(
          professionals.map((p) =>
            p.id === updatedProfessional.id ? updatedProfessional : p
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar profissional:', error);
      }
    } else {
      // Criar um novo profissional
      try {
        const response = await createFuncionario(updatedProfessional); // Criar na API
        setProfessionals([...professionals, { ...response }]);
      } catch (error) {
        console.error('Erro ao criar profissional:', error);
      }
    }
  
    handleCloseDialog();
  };

  const handleDelete = () => {
    setProfessionals(professionals.filter((p) => p.id !== currentProfessional.id));
    handleCloseDeleteDialog();
  };

  const recuperarProfissionais = async () => {
    try {
        setLoading(true);
        const response = await getAllFuncionarios();
        
        if (Array.isArray(response)) {
          const updatedProfessionals = response.map((professional) => {
            const especialidade = especialidades.find((e) => e.id === professional.id_especialidade);
            return {
              ...professional,
              nomeEspecialidade: especialidade ? especialidade.nome : 'Não definida',
            };
          });
          setProfessionals(updatedProfessionals);
        } else {
            throw new Error('A resposta não é um array válido');
        }
    } catch (error) {
        console.log('Erro ao recuperar agendamentos: ', error);
        setError(error);
    } finally {
        setLoading(false);
    }
};

const recuperarEspecialidades = async () => {
  try {
      const response = await getAllEspecialidades();
      setEspecialidades(response);
  } catch (error) {
      setError(error.message || "Erro desconhecido");
  } finally {
      setLoading(false);
  }
};

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'nomeEspecialidade', headerName: 'Especialidade', width: 200 },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleOpenDeleteDialog(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    recuperarProfissionais();
    recuperarEspecialidades();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} style={{ marginBottom: 10 }}>
        Adicionar Profissional de Saúde
      </Button>
      <DataGrid rows={professionals} columns={columns} pageSize={5} components={{ Toolbar: GridToolbar }} />

      {/* Dialog de Cadastro/Edição */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Profissional' : 'Adicionar Profissional'}</DialogTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: 20 }}>
        <TextField
            error={!!errors.nome}
            helperText={errors.nome}
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            value={payloadData.nome}
            onChange={(e) =>
              setPayloadData({ ...payloadData, nome: e.target.value })
            }
          />
          <Autocomplete
            disablePortal
            id="especialidade"
            options={especialidades}
            getOptionLabel={(option) => option.nome}
            value={especialidades.find((especialidade) => especialidade.id === payloadData.id_especialidade) || null}
            onChange={(event, newValue) =>
              setPayloadData({ ...payloadData, id_especialidade: newValue ? newValue.id : '' })
            }
            renderInput={(params) => <TextField {...params} label="Especialidade" required fullWidth />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </div>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HealthProfessionalTable;
