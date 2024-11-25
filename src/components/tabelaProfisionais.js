import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HealthProfessionalTable = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [professionals, setProfessionals] = useState([
    { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia' },
    { id: 2, nome: 'Dra. Maria Oliveira', especialidade: 'Pediatria' },
  ]);

  const handleOpenDialog = (professional = null) => {
    setCurrentProfessional(professional || { nome: '', especialidade: '' });
    setEditMode(!!professional);
    setErrors({});
    setDialogOpen(true);
  };

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

  const handleSave = () => {
    if (!validate()) return;
    if (editMode) {
      setProfessionals(professionals.map((p) => (p.id === currentProfessional.id ? currentProfessional : p)));
    } else {
      setProfessionals([...professionals, { ...currentProfessional, id: professionals.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    setProfessionals(professionals.filter((p) => p.id !== currentProfessional.id));
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'especialidade', headerName: 'Especialidade', width: 200 },
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} style={{ marginBottom: 10 }}>
        Adicionar Profissional de Saúde
      </Button>
      <DataGrid rows={professionals} columns={columns} pageSize={5} components={{ Toolbar: GridToolbar }} />

      {/* Dialog de Cadastro/Edição */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Profissional' : 'Adicionar Profissional'}</DialogTitle>
        <DialogContent>
          <TextField
            error={!!errors.nome}
            helperText={errors.nome}
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            value={currentProfessional?.nome || ''}
            onChange={(e) => setCurrentProfessional({ ...currentProfessional, nome: e.target.value })}
          />
          <TextField
            error={!!errors.especialidade}
            helperText={errors.especialidade}
            margin="dense"
            label="Especialidade"
            fullWidth
            value={currentProfessional?.especialidade || ''}
            onChange={(e) => setCurrentProfessional({ ...currentProfessional, especialidade: e.target.value })}
          />
        </DialogContent>
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
