import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { CircularProgress} from '@mui/material'
import { useMutation } from "@tanstack/react-query"
import { createLink } from "../services/link";
import { Copy } from "../components/Copy";
import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaLink } from "../schemas/link";
import ImgDashboard from "../assets/dashboard.png"
import { AdsClickOutlined, InsertChartOutlined, LayersOutlined } from "@mui/icons-material";

export function HomePage () {
  const { mutate, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: (link) => {
      setShortUrl(import.meta.env.VITE_BACKEND_URL + link.short_url);
    }
  })
  const [shortUrl, setShortUrl] = useState(null)
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(SchemaLink)
  })

  const onSubmit = handleSubmit(data => {
    const { long_url } = data
    mutate({ long_url })
  })

  return (
    <>
    <main className="grid place-items-start">
      <section className="min-h-[calc(100vh-100px)] auto-rows-min grid gap-y-9 mt-15 sm:mt-20 mx-auto p-6">
        <div className="text-center space-y-4">
          <h1 className="max-w-3xl text-3xl sm:text-5xl font-bold">Crea un enlace corto de manera <span className="text-sky-600">fácil y rápida</span></h1>
          <p className="text-lg sm:text-2xl font-medium">Ingresa tu enlace largo y conviertelo en uno <span className="text-sky-600">corto, accesible y rápido</span></p>
        </div>
        <div className="flex flex-col text-sm sm:text-base font-medium">
          <form onSubmit={onSubmit} className="flex flex-col w-full">
            <label>Tu URL aqui</label>
            <div className="flex w-full">
              <div className="flex-1"> 
                <input    
                  {...register('long_url')}
                  disabled={isPending}
                  className={`${errors.long_url ? 'border-red-500' : 'border-sky-600'} w-full h-full outline-none p-3 border rounded-l`}
                  type="text" 
                  placeholder="Introduce tu URL larga aqui..."
                />
              </div>
              <button 
                disabled={isPending}
                className="w-20 sm:w-24 bg-sky-600 rounded-r cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"> 
                {isPending ? <CircularProgress size={24} /> : 'Acortar'}
              </button>
            </div>
            {errors.long_url && <p className="text-red-500">{errors.long_url.message}</p>}
          </form>
        </div>
        {shortUrl && (
          <div className="place-self-center space-y-2 max-w-lg w-full text-sm sm:text-base font-semibold">
            <label>Tu URL acortada</label>
            <div className="flex justify-between items-center bg-zinc-700 p-2 sm:p-4 rounded-md">
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {shortUrl}
              </a>
              <Copy text={shortUrl}/>
            </div>
            <p className="text-center font-medium">Para gestionar tus enlaces y ver estadisticas,  
              <Link className="text-sky-600 ml-1 hover:underline" to="/register">crea una cuenta</Link>
            </p>
          </div>
        )}
      </section>
    </main>
    <section className="bg-zinc-800 flex flex-col gap-8 sm:gap-15 items-center px-5 sm:px-10 py-10 sm:py-20">
      <h2 className="text-2xl sm:text-4xl text-center font-bold">Gestiona tus enlaces en un solo lugar</h2>
      <div className="flex sm:flex-row flex-col text-sm sm:text-base justify-between gap-4">
        <div className="max-w-md flex flex-col items-center gap-2">
          <div className="bg-zinc-600 rounded-xl p-3">
            <InsertChartOutlined fontSize="large"/>
          </div>
          <h6 className="font-bold mt-2">Dashboard Intuitivo</h6>
          <p className="text-zinc-300 text-center font-medium leading-snug">
            Visualiza todas tus métricas importantes de un vistazo con gráficos interactivos
          </p>
        </div>
        <div className="max-w-md flex flex-col items-center gap-2">
          <div className="bg-sky-800/30 rounded-xl p-3">
            <AdsClickOutlined sx={{ color: '#0ea5e9' }} fontSize="large"/>
          </div>
          <h6 className="font-bold mt-2">Gestión Sencilla</h6>
          <p className="text-zinc-300 text-center font-medium leading-snug">
            Crea y gestiona tus enlaces con solo unos clics desde una interfaz amigable
          </p>
        </div>
        <div className="max-w-md flex flex-col items-center gap-2">
          <div className="bg-green-800/30 rounded-xl p-3">
            <LayersOutlined sx={{ color: '#22c55e' }} fontSize="large"/>
          </div>
          <h6 className="font-bold mt-2">Análisis Profundo</h6>
          <p className="text-zinc-300 text-center font-medium leading-snug">
            Obtén insights detallados sobre el rendimiento de cada enlace y tu audiencia
          </p>
        </div>
      </div>
      <img className="shadow-2xl shadow-zinc-200 w-full max-w-md sm:max-w-5xl rounded-2xl" src={ImgDashboard} alt="Dashboard" />
    </section>
    <section className="bg-sky-600 grid place-items-center gap-6 py-10 sm:py-20 px-5 sm:px-10">
        <h1 className="text-2xl sm:text-4xl text-center font-bold">¿Listo para optimizar tus enlaces?</h1>
        <p className="text-center max-w-4xl text-lg sm:text-xl">
          Únete a miles de usuarios que ya están mejorando su presencia digital con Short.ly. Comienza gratis hoy mismo y descubre el poder de los enlaces inteligentes.
        </p>
        <Link to='/register'>
          <button className="bg-white text-base sm:text-lg text-sky-600 font-bold rounded-md p-2 w-52 mt-3 cursor-pointer">
            Comenzar
          </button>
        </Link>
    </section>
    </>
  );
}