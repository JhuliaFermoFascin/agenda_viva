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
                    ml: 40, 
                    transition: 'margin-left 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowX: 'hidden',
                }}
            >
                <h1>Cadastro de Alunos</h1>
                <StudentTable />
            </Box>
        </>
    );
}