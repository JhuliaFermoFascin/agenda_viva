import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useGlobalState } from '../contexts/globalState';
import IconAvatar from "../icon/icon-avatar.svg";

const Navbar = () => {
    const router = useRouter();
    const { trocaEstado } = useGlobalState();

    const handleLogoClick = () => {
        router.push('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        router.push('/');
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#8ECAE6', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={trocaEstado} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={handleLogoClick}
                >
                    <img src="/logoAPAE.svg" alt="Logo APAE" style={{ height: 48, marginRight: 10 }} />
                    <Typography variant="h6" component="div">
                        AgendaViva
                    </Typography>
                </Box>
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
                    <IconAvatar />
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
