import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import { useGlobalState } from '../contexts/globalState';

import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ handleNavigation }) => {
    const [cadastrosOpen, setCadastrosOpen] = React.useState(false);
    const { isNavBarOpen } = useGlobalState();

    const handleSafeNavigation = (path) => {
        if (typeof handleNavigation === 'function') {
            handleNavigation(path);
        } else {
            console.error(`handleNavigation is not a function. Attempted to navigate to: ${path}`);
        }
    };

    const handleCadastrosClick = () => {
        setCadastrosOpen(!cadastrosOpen);
    };

    return (
        <Drawer
            id="sidebar"
            variant="permanent"
            sx={{
                width: isNavBarOpen ? 240 : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isNavBarOpen ? 240 : 0,
                    boxSizing: 'border-box',
                    backgroundColor: '#e0e0e0',
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                    mt: 8,
                },
            }}
        >
            <Toolbar /> 
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleSafeNavigation('/home')}> 
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Início" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleSafeNavigation('/agendamento')}> 
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Agendamento" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={handleCadastrosClick}>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cadastros" />
                        {cadastrosOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                </ListItem>

                <Collapse in={cadastrosOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSafeNavigation('/alunos')}> 
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Alunos" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSafeNavigation('/profissionais')}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profissionais" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSafeNavigation('/especialidades')}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Especialidade" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default Sidebar;
