import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; // Adjust path

const AdminRoute = () => {
  const { user, isAdmin, loading } = useAuth();

  // 1. Wait for AuthProvider to finish checking session & database
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C4A962]"></div>
      </div>
    );
  }

  // 2. If not logged in OR logged in but not an admin, kick them to home
  if (!user || !isAdmin) {
    console.warn("Access denied: Not an admin");
    return <Navigate to="/" replace />;
  }

  // 3. If they are an admin, show the child pages
  return <Outlet />;
};

export default AdminRoute;