import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import StudentTable from '../components/tabelaAlunos';
import { useRouter } from 'next/router';

export default function Alunos() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };
    
    return (
        <>
            <Navbar/>
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
                <StudentTable />
            </Box>
        </>
    );
}