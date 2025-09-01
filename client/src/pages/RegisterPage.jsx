import { Input } from "../components/Input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaRegister } from "../schemas/auth";
import { useAuth } from "../hooks/useAuth";

export function RegisterPage () {
  const { mutateRegister, isPendingRegister } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SchemaRegister)
  })

  const onSubmit = handleSubmit(data => {
    mutateRegister({ data })
  })

  return (
    <main className="grid min-h-[calc(100vh-81px)] p-6">
      <div className="place-self-center w-full max-w-md rounded-xl border border-sky-600 p-5">
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Registrarse</h1>
          <Input 
            name='name'
            type='text' 
            title='Nombre' 
            placeholder='Nombre...'
            register={register}
            error={errors.name}
          />
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
            disabled={isPendingRegister}
            className="font-bold bg-sky-600 p-3 rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
            Registrarse
          </button>
        </form>
      </div>
    </main>
  )
}