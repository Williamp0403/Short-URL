import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../components/Input";
import { SchemaLogin } from "../schemas/auth";
import { useAuth } from "../hooks/useAuth";

export function LoginPage () {
  const { isPending, mutate } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SchemaLogin)
  })

  const onSubmit = handleSubmit(data => {
    mutate({ data })
  })

  return (
    <main className="grid min-h-[calc(100vh-81px)] p-6">
      <div className="place-self-center w-full max-w-md rounded-xl border border-sky-600 p-5">
        <form onSubmit={onSubmit} className="flex flex-col space-y-5">
          <h1 className="text-2xl sm:text-3xl font-bold">Iniciar sesión</h1>
          <Input 
            name='username'
            type='text' 
            title='Nombre de usuario' 
            placeholder='Nombre de usuario...'
            register={register}
            error={errors.username}
          />
          <Input 
            name='password'
            type='password' 
            title='Contraseña' 
            placeholder='Contraseña...'
            register={register}
            error={errors.password}
          />
          <button 
            disabled={isPending}
            className="font-bold bg-sky-600 p-3 rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  )
}