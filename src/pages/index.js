import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BadgeIcon from '@mui/icons-material/Badge';

export default function Home() {
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
                <Grid container spacing={6} justifyContent="center" alignItems="center" paddingTop={10}>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/alunos')}
                        >
                            <CardContent>
                                <SchoolIcon sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Alunos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/agendamento')}
                        >
                            <CardContent>
                                <EventNoteIcon sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Agendamentos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/profissionais')}
                        >
                            <CardContent>
                                <BadgeIcon sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Profissionais
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}