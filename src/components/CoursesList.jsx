import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { getCourses } from '../api/client.js';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getCourses()
      .then((result) => {
        if (!active) return;
        const items = Array.isArray(result) ? result : result?.courses ?? [];
        setCourses(items);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Error al cargar los cursos');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          Cursos disponibles
        </Typography>
        <Typography color="text.secondary">
          Explora todos los cursos registrados en la plataforma.
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!loading && !error && courses.length === 0 && (
        <Alert severity="info">
          No hay cursos todavia. Ve a "Agregar curso" para crear el primero.
        </Alert>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          <Box sx={{ mb: 3 }}>
            <Chip
              label={`${courses.length} curso${courses.length !== 1 ? 's' : ''}`}
              sx={{
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {courses.map((course) => {
              const title = course.nombre || course.name || course.title || 'Sin titulo';
              const description =
                course.descripcion || course.description || 'Sin descripcion';
              const id = course.id ?? course._id ?? title;

              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
}
