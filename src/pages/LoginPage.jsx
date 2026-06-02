import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { useAuth } from '../auth/useAuth.js';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('admin');
  const [contrasena, setContrasena] = useState('admin123');
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !contrasena) return;

    try {
      await login(usuario, contrasena);
      navigate('/courses');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesion
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={loading}
            required
          />
          <TextField
            label="Contrasena"
            type="password"
            fullWidth
            margin="normal"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            disabled={loading}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || !usuario || !contrasena}
          >
            {loading ? <CircularProgress size={24} /> : 'Ingresar'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
