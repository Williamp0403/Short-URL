import { HeaderPrivate } from './components/HeaderPrivate'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { CircularProgress } from '@mui/material';

export const ProtectedRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const authLoading = useAuthStore(state => state.authLoading);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <>
      <HeaderPrivate />
      <Outlet />
    </>
  );
}