import { useMutation } from "@tanstack/react-query"
import { login, logout, register } from "../services/auth"
import { useAuthStore } from "../store/authStore"
import { toast } from "sonner"

export function useAuth () {
  const setUser = useAuthStore(state => state.setUser)
  const clearUser = useAuthStore(state => state.clearUser)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const { isPending, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (response => {
      setUser(response.data.user)
      toast.success(`Bienvenido ${response.data.user.name}`)
    }),
  })

  const { isPending: isPendingRegister, mutate: mutateRegister } = useMutation({
    mutationFn: register,
    onSuccess: (response => {
      setUser(response.data.user)
      toast.success(`Bienvenido ${response.data.user.name}`)
    })
  })

  const { isPending: isPendingLogout, mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser()
    }
  })

  return {
    isAuthenticated,
    isPending,
    isPendingRegister,
    isPendingLogout,
    mutate,
    mutateRegister,
    mutateLogout
  }
}