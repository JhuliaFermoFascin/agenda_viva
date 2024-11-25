import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import HealthProfessionalTable from '../components/tabelaProfisionais'; // Corrigido para o nome correto do componente
import { useRouter } from 'next/router';

export default function Alunos() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <Navbar />
      <Sidebar handleNavigation={handleNavigation} />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centraliza horizontalmente
          justifyContent: 'center', // Centraliza verticalmente
          minHeight: '100vh', // Ocupa 100% da altura da tela
          p: 3,
          ml: 40, // Ajuste para acomodar a largura da sidebar estendida
          transition: 'margin-left 0.3s',
        }}
      >
        <h1>Cadastro de Profissionais</h1>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Centraliza horizontalmente o contêiner da tabela
            width: '100%', // Ajusta para ocupar 100% da largura disponível após o ajuste da sidebar
            p: 2, // Padding para melhorar o visual
          }}
        >
          <Box sx={{ width: '80%', maxWidth: 1200 }}> {/* Limita a largura máxima da tabela para 1200px */}
            <HealthProfessionalTable />
          </Box>
        </Box>
      </Box>
    </>
  );
}
