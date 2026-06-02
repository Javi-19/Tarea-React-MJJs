import { Box } from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import CoursesList from '../components/CoursesList.jsx';

export default function CoursesPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg)' }}>
      <Navbar />
      <CoursesList />
    </Box>
  );
}