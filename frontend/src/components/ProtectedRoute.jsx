import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

