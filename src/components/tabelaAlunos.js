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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReactInputMask from 'react-input-mask';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const StudentTable = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAluno, setCurrentAluno] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [alunos, setAlunos] = useState([
    {
      id: 1,
      aluno: 'Alice Souza',
      responsavel: 'Maria Oliveira',
      contato: '(48) 99555-0118',
      dataNascimento: '01/01/2020',
      cpf: '241.504.856-90',
      sexo: 'F',
    },
    {
      id: 2,
      aluno: 'Gabriel Lima',
      responsavel: 'Ana Paula Silva',
      contato: '(48) 99555-0118',
      dataNascimento: '01/01/2020',
      cpf: '215.689.284-91',
      sexo: 'M',
    },
  ]);

  const handleOpenDialog = (aluno = null) => {
    setCurrentAluno(aluno || { aluno: '', responsavel: '', contato: '', dataNascimento: '', cpf: '', sexo: '' });
    setEditMode(!!aluno);
    setErrors({});
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentAluno(null);
  };

  const handleOpenDeleteDialog = (aluno) => {
    setCurrentAluno(aluno);
    setDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpen(false);
    setCurrentAluno(null);
  };

  const validate = () => {
    let tempErrors = {};
    if (!currentAluno.aluno) tempErrors.aluno = 'Nome do aluno é obrigatório';
    else if (/\d/.test(currentAluno.aluno)) tempErrors.aluno = 'Nome não pode conter números';

    if (!currentAluno.responsavel) tempErrors.responsavel = 'Nome do responsável é obrigatório';
    else if (/\d/.test(currentAluno.responsavel)) tempErrors.responsavel = 'Nome do responsável não pode conter números';

    if (!currentAluno.contato) tempErrors.contato = 'Contato é obrigatório';
    else if (/[^0-9()-\s]/.test(currentAluno.contato)) tempErrors.contato = 'Contato deve conter apenas números';

    if (!currentAluno.dataNascimento) tempErrors.dataNascimento = 'Data de nascimento é obrigatória';

    if (!currentAluno.cpf) tempErrors.cpf = 'CPF é obrigatório';
    else if (/[^0-9.-]/.test(currentAluno.cpf)) tempErrors.cpf = 'CPF deve conter apenas números';

    if (!currentAluno.sexo) tempErrors.sexo = 'Sexo é obrigatório';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editMode) {
      setAlunos(alunos.map((a) => (a.id === currentAluno.id ? currentAluno : a)));
    } else {
      setAlunos([...alunos, { ...currentAluno, id: alunos.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    setAlunos(alunos.filter((a) => a.id !== currentAluno.id));
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'aluno', headerName: 'Aluno', width: 150 },
    { field: 'responsavel', headerName: 'Responsável', width: 150 },
    { field: 'contato', headerName: 'Contato', width: 150 },
    { field: 'dataNascimento', headerName: 'Data de Nascimento', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    {
      field: 'sexo',
      headerName: 'Sexo',
      width: 60,
      renderCell: (params) => (
        params.value === 'F' ? 
        <FemaleIcon sx={{ color: 'pink', fontSize: 30, stroke: '#pink', strokeWidth: 0.5 }} /> : 
        <MaleIcon sx={{ color: '#8ECAE6', fontSize: 30, stroke: '#8ECAE6', strokeWidth: 0.5 }} />
    )},
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleOpenDeleteDialog(params.row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 150px)', width: '95%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} style={{ marginBottom: '10px' }}>
          Adicionar Aluno
        </Button>
        <DataGrid
          rows={alunos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          localeText={{
            noRowsLabel: 'Sem alunos cadastrados',
            toolbarDensity: 'Densidade',
            toolbarDensityLabel: 'Densidade',
            toolbarDensityCompact: 'Compacto',
            toolbarDensityStandard: 'Padrão',
            toolbarDensityComfortable: 'Confortável',
            toolbarColumns: 'Colunas',
            toolbarColumnsLabel: 'Selecionar colunas',
            toolbarFilters: 'Filtros',
            toolbarFiltersLabel: 'Mostrar filtros',
            toolbarExport: 'Exportar',
            toolbarExportLabel: 'Exportar',
            toolbarExportCSV: 'Baixar como CSV',
            toolbarExportPrint: 'Imprimir',
            columnsPanelTextFieldLabel: 'Encontrar coluna',
            columnsPanelTextFieldPlaceholder: 'Título da coluna',
            columnsPanelShowAllButton: 'Mostrar tudo',
            columnsPanelHideAllButton: 'Ocultar tudo',
            filterPanelAddFilter: 'Adicionar filtro',
            filterPanelDeleteIconLabel: 'Excluir',
            filterPanelOperators: 'Operadores',
            filterPanelOperatorAnd: 'E',
            filterPanelOperatorOr: 'Ou',
            filterPanelColumns: 'Colunas',
            filterPanelInputLabel: 'Valor',
            filterPanelInputPlaceholder: 'Filtrar valor',
            footerRowSelected: (count) => `${count.toLocaleString()} linha(s) selecionada(s)`,
            footerTotalRows: 'Total de linhas:',
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
          }}
        />
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{editMode ? 'Editar Aluno' : 'Adicionar Aluno'}</DialogTitle>
          <DialogContent>
            <TextField
              required
              error={!!errors.aluno}
              helperText={errors.aluno}
              autoFocus
              margin="dense"
              label="Nome do Aluno"
              fullWidth
              value={currentAluno?.aluno || ''}
              onChange={(e) => setCurrentAluno({ ...currentAluno, aluno: e.target.value })}
            />
            <TextField
              required
              error={!!errors.responsavel}
              helperText={errors.responsavel}
              margin="dense"
              label="Responsável"
              fullWidth
              value={currentAluno?.responsavel || ''}
              onChange={(e) => setCurrentAluno({ ...currentAluno, responsavel: e.target.value })}
            />
            <ReactInputMask
              mask="(99) 99999-9999"
              value={currentAluno?.contato || ''}
              onChange={(e) => setCurrentAluno({ ...currentAluno, contato: e.target.value })}
            >
              {() => (
                <TextField
                  required
                  error={!!errors.contato}
                  helperText={errors.contato}
                  margin="dense"
                  label="Contato"
                  fullWidth
                />
              )}
            </ReactInputMask>
            <ReactInputMask
              mask="99/99/9999"
              value={currentAluno?.dataNascimento || ''}
              onChange={(e) => setCurrentAluno({ ...currentAluno, dataNascimento: e.target.value })}
            >
              {() => (
                <TextField
                  required
                  error={!!errors.dataNascimento}
                  helperText={errors.dataNascimento}
                  margin="dense"
                  label="Data de Nascimento"
                  fullWidth
                />
              )}
            </ReactInputMask>
            <ReactInputMask
              mask="999.999.999-99"
              value={currentAluno?.cpf || ''}
              onChange={(e) => setCurrentAluno({ ...currentAluno, cpf: e.target.value })}
            >
              {() => (
                <TextField
                  required
                  error={!!errors.cpf}
                  helperText={errors.cpf}
                  margin="dense"
                  label="CPF"
                  fullWidth
                />
              )}
            </ReactInputMask>
            <FormControl component="fieldset" required error={!!errors.sexo}>
              <FormLabel component="legend">Sexo</FormLabel>
              <RadioGroup
                row
                value={currentAluno?.sexo || ''}
                onChange={(e) => setCurrentAluno({ ...currentAluno, sexo: e.target.value })}
              >
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                <FormControlLabel value="F" control={<Radio />} label="Feminino" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
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
    </div>
  );
};

export default StudentTable;
