// components/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useGlobalState } from '../contexts/globalState'

const Navbar = () => {
    
    const { trocaEstado } = useGlobalState();

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#8ECAE6', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {/* Ícone de Menu na Navbar */}
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={trocaEstado} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>

                {/* Logo e Título centralizados */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/logoAPAE.svg" alt="Logo APAE" style={{ height: 48, marginRight: 10 }} />
                    <Typography variant="h6" component="div">
                        AgendaViva
                    </Typography>
                </Box>

                {/* Ícones de logout e avatar à direita */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: 'green',
                                borderRadius: '50%',
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            Online
                        </Typography>
                    </Box>
                    <Avatar alt="User Avatar" src="/avatar.png" />
                    <IconButton edge="end" color="inherit">
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
