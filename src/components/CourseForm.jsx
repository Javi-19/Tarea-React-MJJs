import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createCourse } from '../api/client.js';

export default function CourseForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const nombreError =
    nombre.length > 0 && nombre.trim().length < 3
      ? 'El nombre debe tener al menos 3 caracteres'
      : null;
  const descripcionError =
    descripcion.length > 0 && descripcion.trim().length < 3
      ? 'La descripcion debe tener al menos 3 caracteres'
      : null;
  const isValid = nombre.trim().length >= 3 && descripcion.trim().length >= 3;
  const descProgress = Math.min((descripcion.length / 500) * 100, 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);

    try {
      await createCourse({ nombre: nombre.trim(), descripcion: descripcion.trim() });
      setSuccess(true);
      setTimeout(() => navigate('/courses'), 1500);
    } catch (err) {
      setError(err.message || 'Error al crear el curso');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          Agregar curso
        </Typography>
        <Typography color="text.secondary">
          Completa el formulario para registrar un nuevo curso.
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Curso creado. Redirigiendo a la lista...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nombre del curso"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={Boolean(nombreError)}
            helperText={nombreError || ' '}
            disabled={loading || success}
            required
            inputProps={{ maxLength: 100 }}
          />

          <TextField
            label="Descripcion"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            error={Boolean(descripcionError)}
            helperText={descripcionError || 'Requerida'}
            disabled={loading || success}
            required
            inputProps={{ maxLength: 500 }}
          />

          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={descProgress}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: '#e2e6f3',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
                  borderRadius: 2,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {descripcion.length}/500 caracteres
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !isValid || success}
              sx={{ flex: 1 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Guardar curso'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/courses')}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
