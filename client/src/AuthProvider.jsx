// src/providers/AuthProvider.jsx
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { validateAuthentication } from "./services/auth";
import { useAuthStore } from "./store/authStore";

export function AuthProvider({ children }) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setAuthLoading = useAuthStore(state => state.setAuthLoading)

  const { data, error, isLoading } = useQuery({
    queryKey: ["auth-validation"],
    queryFn: validateAuthentication,
    enabled: !isAuthenticated, // solo si no está autenticado
    staleTime: Infinity,       // nunca se marca como stale
    cacheTime: Infinity,       // nunca se borra del caché
    retry: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (isLoading) setAuthLoading(true)

    if (!isLoading) {
      if (data) setUser(data.user);
      if (error) clearUser();
    }
  }, [data, error, isLoading, setUser, clearUser, setAuthLoading]);

  return children;
}
