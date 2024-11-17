// pages/alunos.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { getAllAlunos } from '@/api/services/alunos';

export default function Alunos() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    // EXEMPLO DE USO DA REQUEST:
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const recuperarAlunos = async () => {
        try {
            setLoading(true);
            const response = await getAllAlunos();
            console.log(response);
            setData(response);
        } catch (error) {
            console.error('Erro ao buscar os alunos:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        recuperarAlunos();
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
                    ml: 40, // Ajuste para acomodar a largura da sidebar estendida
                    transition: 'margin-left 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Centraliza o conteúdo horizontalmente
                    overflowX: 'hidden', // Evita barra de rolagem horizontal
                }}
            >
                <h1>Cadastro de Alunos</h1>
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>Erro ao carregar dados dos alunos.</p>
                ) : (
                    data && <pre>{data}</pre>
                )}

            </Box>
        </>
    );
}
