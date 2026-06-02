import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { useAuth } from '../auth/useAuth.js';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const tabValue = location.pathname === '/courses/new' ? 1 : 0;

  const handleTabChange = (_, newValue) => {
    navigate(newValue === 0 ? '/courses' : '/courses/new');
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mr: 2,
            userSelect: 'none',
          }}
        >
          CursosApp
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ flexGrow: 1 }}
          TabIndicatorProps={{ style: { height: 3 } }}
        >
          <Tab label="Lista de cursos" />
          <Tab label="Agregar curso" />
        </Tabs>

        <Button variant="outlined" size="small" onClick={logout}>
          Cerrar sesion
        </Button>
      </Toolbar>
    </AppBar>
  );
}
