import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { useAuthStore } from './store/authStore';
import { CircularProgress } from '@mui/material';

export const PublicRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const authLoading = useAuthStore(state => state.authLoading);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}