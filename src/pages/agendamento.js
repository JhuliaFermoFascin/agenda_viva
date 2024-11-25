import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { createAgendamento, deleteAgendamento, getAllAgendamentos, updateAgendamento } from '@/api/services/agendamentos';
import { Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DialogAgendaViva from '@/components/DialogAviso';
import { getAllAlunos } from '@/api/services/alunos';
import { getAllFuncionarios } from '@/api/services/funcionarios';
import DialogAgendamento from '@/components/DialogAgendamento';

export default function Agendamentos() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    const [agendamentos, setAgendamentos] = useState([]); 
    const [alunos, setAlunos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [payloadData, setPayloadData] = useState({
        id_aluno: '',
        id_funcionario: '',
        data: '',
        hora_inicio: '',
        hora_fim: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [agendamentoIdParaDeletar, setAgendamentoIdParaDeletar] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const recuperarAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await getAllAgendamentos();
            
            if (Array.isArray(response)) {
                setAgendamentos(response);
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

    const recuperarAlunosEFuncionarios = async () => {
        try {
            const [alunosResponse, funcionariosResponse] = await Promise.all([
                getAllAlunos(),
                getAllFuncionarios(),
            ]);

            if (alunosResponse && funcionariosResponse) {
                setAlunos(alunosResponse);
                setFuncionarios(funcionariosResponse);
            } else {
                throw new Error("Dados inválidos recebidos");
            }
        } catch (error) {
            setError(error.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {

        const horaOrdemCorreta = (horario) => {
            const [hora, min] = horario.split(':');
            return `${hora}:${min}:00`;
        }

        const horaCorretaInicio = () => {
            const data = payloadData.data;
            const hora = payloadData.hora_inicio;
            return `${data}T${horaOrdemCorreta(hora)}`;
        }

        const horaCorretaFim = () => {
            const data = payloadData.data;
            const hora = payloadData.hora_fim;
            return `${data}T${horaOrdemCorreta(hora)}`;
        }

        if (!payloadData.data || !payloadData.hora_fim || !payloadData.hora_inicio || !payloadData.id_aluno || !payloadData.id_funcionario) {
            handleToastOpen("Preencha todos os campos corretamente.");
            return;
        }

        try {
            setLoading(true);

            if (isEditing) {

                const formattedData = {
                    ...payloadData,
                    hora_inicio: horaCorretaInicio(),
                    hora_fim: horaCorretaFim()
                }
                const response = await updateAgendamento(editingId, formattedData);
                if (response.response?.data?.error === "O funcionário já possui um agendamento nesse horário") {
                    handleToastOpen("O funcionário já possui um agendamento nesse horário");
                    return;
                }
                setIsEditing(false);
                setIsAdding(false);
                setEditingId(null);
                setIsDialogOpen(false);
                recuperarAgendamentos();
                setPayloadData(
                    { 
                        id_aluno: '',
                        id_funcionario: '',
                        data: '',
                        hora_inicio: '',
                        hora_fim: ''
                    });
                handleToastOpen('Agendamento editado com sucesso!');
            } else {
                const response = await createAgendamento(payloadData);
                if (response.response?.data?.error === "O funcionário já possui um agendamento nesse horário") {
                    handleToastOpen("O funcionário já possui um agendamento nesse horário");
                    return;
                }
                setIsEditing(false);
                setIsAdding(false);
                setEditingId(null);
                setIsDialogOpen(false);
                recuperarAgendamentos();
                setPayloadData(
                    { 
                        id_aluno: '',
                        id_funcionario: '',
                        data: '',
                        hora_inicio: '',
                        hora_fim: ''
                    });
                handleToastOpen('Agendamento criado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!agendamentoIdParaDeletar) return;
        try {
            setLoading(true);
            await deleteAgendamento(agendamentoIdParaDeletar);
            setIsDialogDeleteOpen(false);
            recuperarAgendamentos();
            handleToastOpen('Agendamento removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover agendamento: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (id) => {
        setAgendamentoIdParaDeletar(id);
        setIsDialogDeleteOpen(true);
    }

    const handleEdit = (agendamento) => {

        const formatarHora = (horaISO) => {
            if (!horaISO) return '';
            const [data, horaEFuso] = horaISO.split('T');
            const [horario] = horaEFuso.split('-');
            const [hora, min] = horario.split(':');
            return `${hora}:${min}`;
        }

        setPayloadData({
            id_aluno: agendamento.id_aluno,
            id_funcionario: agendamento.id_funcionario,
            data: agendamento.data,
            hora_inicio: formatarHora(agendamento.hora_inicio),
            hora_fim: formatarHora(agendamento.hora_fim),
        });
        setIsEditing(true);
        setEditingId(agendamento.id);
        setIsDialogOpen(true);
    };

    const formatarData = (dataISO) => {
        if (!dataISO) return '';
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    const formatarHora = (horaISO) => {
        if (!horaISO) return '';
        const [data, horaEFuso] = horaISO.split('T');
        const [horario] = horaEFuso.split('-');
        const [hora, min] = horario.split(':');
        return `${hora}:${min}`;
    }

    const handleToastOpen = (message) => {
        setToastMessage(message);
        setToastOpen(true);
    };
    
    const handleToastClose = () => {
        setToastOpen(false);
    };

    const handleButtonCadastrar = () => {
        setPayloadData(
            { 
                id_aluno: '',
                id_funcionario: '',
                data: '',
                hora_inicio: '',
                hora_fim: ''
            });
        setIsDialogOpen(true);
        setIsAdding(true);
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsAdding(false);
        setIsEditing(false);
    }

    useEffect(() => {
        recuperarAgendamentos();
        recuperarAlunosEFuncionarios();
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
                    overflowY: 'auto',
                    maxHeight: '100vh',
                }}
            >
                <h2 style={{ fontSize: 20 }}>AGENDAMENTOS</h2>
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
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Button 
                                variant="contained" 
                                onClick={handleButtonCadastrar} 
                                sx={{ width: '30%', backgroundColor: 'green', borderRadius: 10, fontSize: 14, gap: 2 }}>
                                <div style={{ scale: '1.4' }}>
                                    +
                                </div>
                                Agendamento
                            </Button>
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
                                            <TableCell>
                                                {
                                                    alunos.find(aluno => aluno.id === agendamento.id_aluno)?.nome || 'Carregando...'
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    funcionarios.find(funcionario => funcionario.id === agendamento.id_funcionario)?.nome || 'Carregando...'
                                                }
                                            </TableCell>
                                            <TableCell>{formatarData(agendamento.data)}</TableCell>
                                            <TableCell>{formatarHora(agendamento.hora_inicio)}</TableCell>
                                            <TableCell>{formatarHora(agendamento.hora_fim)}</TableCell>
                                            <TableCell sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                                                <Button
                                                    onClick={() => handleEdit(agendamento)}
                                                    variant="outlined"
                                                    sx={{ fontSize: 12, fontWeight: 600 }}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    onClick={() => handleOpenDialog(agendamento.id)}
                                                    variant="contained"
                                                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: 'red' }}
                                                >
                                                    Remover
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <DialogAgendaViva 
                            isOpen={isDialogDeleteOpen} 
                            title='Remover' 
                            description='Tem certeza que deseja remover o agendamento?' 
                            onClickNao={() => setIsDialogDeleteOpen(false)}
                            onClickSim={handleDelete} 
                        />

                        <Snackbar
                            open={toastOpen}
                            autoHideDuration={3000}
                            onClose={handleToastClose}
                            message={toastMessage}
                        />

                        {error && <Snackbar open={true} message={`Erro: ${error.message}`} />}
                        <DialogAgendamento
                            open={isDialogOpen}
                            onClose={handleCloseDialog}
                            onSave={handleSubmit}
                            payloadData={payloadData}
                            setPayloadData={setPayloadData}
                            alunos={alunos}
                            funcionarios={funcionarios}
                            isAdding={isAdding}
                        />
                    </>
                )}
            </Box>
        </>
    );
}
