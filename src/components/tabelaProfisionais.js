import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  getAllFuncionarios,
  updateFuncionario,
  createFuncionario,
  deleteFuncionario,
} from '@/api/services/funcionarios';
import { getAllEspecialidades } from '@/api/services/especialidades';

const HealthProfessionalTable = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [payloadData, setPayloadData] = useState({ nome: '', id_especialidade: '' });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToastOpen = (message) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const recuperarEspecialidades = async () => {
    try {
      const response = await getAllEspecialidades();
      if (Array.isArray(response)) {
        setEspecialidades(response);
      } else {
        console.error('Resposta inválida ao buscar especialidades:', response);
      }
    } catch (error) {
      console.error('Erro ao recuperar especialidades:', error);
    }
  };

  const recuperarFuncionarios = async () => {
    try {
      setLoading(true);
      const funcionariosResponse = await getAllFuncionarios();
      const especialidadesResponse = await getAllEspecialidades();

      if (Array.isArray(funcionariosResponse) && Array.isArray(especialidadesResponse)) {
        const updatedProfessionals = funcionariosResponse.map((funcionario) => {
          const especialidade = especialidadesResponse.find(
            (e) => String(e.id) === String(funcionario.id_especialidade)
          );
          return {
            ...funcionario,
            nome: funcionario.nome.trim(),
            nomeEspecialidade: especialidade ? especialidade.nome : 'Não definida',
          };
        });

        setProfessionals(updatedProfessionals);
      }
    } catch (error) {
      console.error('Erro ao recuperar funcionários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (professional = null) => {
    if (professional) {
      setEditMode(true);
      setCurrentProfessional(professional);
      setPayloadData({
        nome: professional.nome.trim(),
        id_especialidade: professional.id_especialidade || '',
      });
    } else {
      setEditMode(false);
      setCurrentProfessional(null);
      setPayloadData({ nome: '', id_especialidade: '' });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentProfessional(null);
    setPayloadData({ nome: '', id_especialidade: '' });
  };

  const handleSave = async () => {
    try {
      if (!payloadData.nome || !payloadData.id_especialidade) {
        handleToastOpen('Preencha todos os campos obrigatórios.');
        return;
      }

      const updatedProfessional = {
        id: currentProfessional?.id || null,
        nome: payloadData.nome.trim(),
        id_especialidade: payloadData.id_especialidade,
      };

      if (editMode) {
        const updated = await updateFuncionario(updatedProfessional.id, updatedProfessional);
        setProfessionals((prev) =>
          prev.map((prof) =>
            prof.id === updated.id
              ? {
                  ...updated,
                  nomeEspecialidade:
                    especialidades.find((e) => e.id === updated.id_especialidade)?.nome || 'Não definida',
                }
              : prof
          )
        );
        handleToastOpen('Profissional editado com sucesso!');
      } else {
        const created = await createFuncionario(updatedProfessional);
        setProfessionals((prev) => [
          ...prev,
          {
            ...created,
            nomeEspecialidade:
              especialidades.find((e) => e.id === created.id_especialidade)?.nome || 'Não definida',
          },
        ]);
        handleToastOpen('Profissional adicionado com sucesso!');
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar profissional:', error);
      handleToastOpen('Erro ao salvar profissional.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFuncionario(id);
      await recuperarFuncionarios();
      handleToastOpen('Profissional excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      handleToastOpen('Erro ao excluir profissional.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await recuperarEspecialidades();
        await recuperarFuncionarios();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto', textAlign: 'center' }} translate="no">
      <h2
        style={{
          marginBottom: '20px',
          fontSize: '28px', // Aumenta o tamanho da fonte
        }}
      >
        Cadastro de Profissionais
      </h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 3, backgroundColor: 'green', width: '100%' }}
      >
        Adicionar Profissional
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Especialidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionals.map((prof) => (
              <TableRow key={prof.id}>
                <TableCell>{prof.nome}</TableCell>
                <TableCell>{prof.nomeEspecialidade}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenDialog(prof)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(prof.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Profissional' : 'Adicionar Profissional'}</DialogTitle>
        <Box sx={{ p: 3 }}>
          <TextField
            label="Nome"
            fullWidth
            value={payloadData.nome}
            onChange={(e) => setPayloadData({ ...payloadData, nome: e.target.value })}
            margin="normal"
            autoCorrect="off"
            spellCheck="false"
            inputProps={{ autoComplete: 'off' }}
          />
          <Autocomplete
            options={especialidades}
            getOptionLabel={(option) => option.nome}
            value={
              especialidades.find((e) => String(e.id) === String(payloadData.id_especialidade)) || null
            }
            onChange={(event, newValue) =>
              setPayloadData({ ...payloadData, id_especialidade: newValue?.id || '' })
            }
            renderInput={(params) => <TextField {...params} label="Especialidade" />}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? 'Salvar Alterações' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </Box>
  );
};

export default HealthProfessionalTable;
