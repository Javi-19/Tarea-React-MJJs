import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {AuthProvider} from "./auth/AuthContext.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CreateCoursePage from "./pages/CreateCoursePage.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/courses',
                element: <CoursesPage />,
            },
            {
                path: '/courses/new',
                element: <CreateCoursePage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
], { basename: import.meta.env.BASE_URL });

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
