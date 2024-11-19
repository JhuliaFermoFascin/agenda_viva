// pages/alunos.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { getAllAlunos } from '@/api/services/alunos';
import { createAgendamento, deleteAgendamento, getAllAgendamentos, updateAgendamento } from '@/api/services/agendamentos';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

export default function Agendamentos() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    // EXEMPLO DE USO DA REQUEST DE AGENDAMENTO:
    const [agendamentos, setAgendamentos] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //exemplo de payload para cadastrar agendamento
    const [payloadData, setPayloadData] = useState({
        id_aluno: '',
        id_funcionario: '',
        data: '',
        hora_inicio: '',
        hora_fim: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    //buscar agendamentos

    const recuperarAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await getAllAgendamentos();
            setAgendamentos(response);
        } catch (error) {
            console.error('Erro ao buscar agendamentos: ', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        console.log('Payload: ', payloadData);
        try {
            setLoading(true);
            if (isEditing) {
                await updateAgendamento(editingId, payloadData);
                return;
            } else {
                await createAgendamento(payloadData);
            }
            setPayloadData(
                { 
                    id_aluno: '',
                    id_funcionario: '',
                    data: '',
                    hora_inicio: '',
                    hora_fim: ''
                });
            setIsEditing(false);
            setEditingId(null);
            recuperarAgendamentos();
        } catch (error) {
            console.error('Erro ao salvar agendamento: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteAgendamento(id);
            recuperarAgendamentos();
        } catch (error) {
            console.error('Erro ao deletar agendamentos: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (agendamento) => {
        setPayloadData({
            id_aluno: agendamento.id_aluno,
            id_funcionario: agendamento.id_funcionario,
            data: agendamento.data,
            hora_inicio: agendamento.hora_inicio.split('T')[1].slice(0, 5),
            hora_fim: agendamento.hora_fim.split('T')[1].slice(0, 5),
        });
        setIsEditing(true);
        setEditingId(agendamento.id);
    };

    function formatarData(dataISO) {
        if (!dataISO) return '';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        recuperarAgendamentos();
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar handleNavigation={handleNavigation} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: 40,
                    mt: 20,
                    transition: 'margin-left 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto', // Permite a rolagem vertical
                    maxHeight: '100vh', // Limita a altura do contêiner à altura da janela
                }}
            >
                <h2 style={{ fontSize: 20 }}>Gerenciar Agendamentos</h2>
                <br />
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>Erro ao carregar agendamentos.</p>
                ) : (
                    <>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: '100%',
                                maxWidth: 600,
                                mb: 3,
                            }}
                        >
                            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                <TextField
                                    label="Aluno (ID)"
                                    name="id_aluno"
                                    type="number"
                                    value={payloadData.id_aluno}
                                    onChange={(e) => setPayloadData({ ...payloadData, id_aluno: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Funcionário (ID)"
                                    name="id_funcionario"
                                    type="number"
                                    value={payloadData.id_funcionario}
                                    onChange={(e) => setPayloadData({ ...payloadData, id_funcionario: e.target.value })}
                                    required
                                />
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                <TextField
                                    label="Data"
                                    name="data"
                                    type="date"
                                    value={payloadData.data}
                                    onChange={(e) => setPayloadData({ ...payloadData, data: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Hora Início"
                                    name="hora_inicio"
                                    type="time"
                                    value={payloadData.hora_inicio}
                                    onChange={(e) => setPayloadData({ ...payloadData, hora_inicio: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Hora Fim"
                                    name="hora_fim"
                                    type="time"
                                    value={payloadData.hora_fim}
                                    onChange={(e) => setPayloadData({ ...payloadData, hora_fim: e.target.value })}
                                    required
                                />
                            </Box>
                            <Button variant="contained" onClick={handleSubmit}>
                                {isEditing ? 'Salvar Alterações' : 'Cadastrar Agendamento'}
                            </Button>
                            {isEditing && (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setPayloadData({ id_aluno: '', id_funcionario: '', data: '', hora_inicio: '', hora_fim: '' });
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </Box>

                        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Aluno</TableCell>
                                        <TableCell>Funcionário</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Hora Início</TableCell>
                                        <TableCell>Hora Fim</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {agendamentos.map((agendamento) => (
                                        <TableRow key={agendamento.id}>
                                            <TableCell>{agendamento.id_aluno}</TableCell>
                                            <TableCell>{agendamento.id_funcionario}</TableCell>
                                            <TableCell>{formatarData(agendamento.data)}</TableCell>
                                            <TableCell>{agendamento.hora_inicio.split('T')[1].slice(0, 5)}</TableCell>
                                            <TableCell>{agendamento.hora_fim.split('T')[1].slice(0, 5)}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(agendamento)}>Editar</Button>
                                                <Button color="error" onClick={() => handleDelete(agendamento.id)}>
                                                    Deletar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </>
    );
}
