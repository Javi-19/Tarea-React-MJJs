import { Box } from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import CourseForm from '../components/CourseForm.jsx';

export default function CreateCoursePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg)' }}>
      <Navbar />
      <CourseForm />
    </Box>
  );
}