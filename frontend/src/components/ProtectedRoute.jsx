import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if user is logged in by looking for token in localStorage
    const userInfo = localStorage.getItem('userInfo');
    const isAuthenticated = userInfo && JSON.parse(userInfo).token;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
