import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Autocomplete } from '@mui/material';

export default function DialogAgendamento({ open, onClose, onSave, payloadData, setPayloadData, alunos, funcionarios, isAdding }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{isAdding ? 'Cadastrar Agendamento' : 'Editar Agendamento'}</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: 20 }}>
                <Autocomplete
                    disablePortal
                    id="aluno"
                    options={alunos}
                    getOptionLabel={(option) => option.nome}
                    value={alunos.find((aluno) => aluno.id === payloadData.id_aluno) || null}
                    onChange={(event, newValue) => setPayloadData({ ...payloadData, id_aluno: newValue ? newValue.id : '' })}
                    renderInput={(params) => <TextField {...params} label="Aluno" required fullWidth />}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    freeSolo
                    fullWidth
                />
                <Autocomplete
                    disablePortal
                    id="funcionario"
                    options={funcionarios}
                    getOptionLabel={(option) => option.nome}
                    value={funcionarios.find((funcionario) => funcionario.id === payloadData.id_funcionario) || null}
                    onChange={(event, newValue) => setPayloadData({ ...payloadData, id_funcionario: newValue ? newValue.id : '' })}
                    renderInput={(params) => <TextField {...params} label="Funcionário" required fullWidth />}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    freeSolo
                    fullWidth
                />
                <TextField
                    label="Data"
                    name="data"
                    type="date"
                    value={payloadData.data}
                    onChange={(e) => setPayloadData({ ...payloadData, data: e.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Hora Início"
                    name="hora_inicio"
                    type="time"
                    value={payloadData.hora_inicio}
                    onChange={(e) => setPayloadData({ ...payloadData, hora_inicio: e.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Hora Fim"
                    name="hora_fim"
                    type="time"
                    value={payloadData.hora_fim}
                    onChange={(e) => setPayloadData({ ...payloadData, hora_fim: e.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <DialogActions>
                <Button sx={{ color: 'red' }} onClick={onClose}>Cancelar</Button>
                <Button variant='contained' onClick={() => onSave()}>{isAdding ? 'Cadastrar' : 'Salvar Alterações'}</Button>
            </DialogActions>
        </Dialog>
    );
}
