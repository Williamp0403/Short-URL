import { Link } from "react-router-dom";

export function NotFoundPage () {
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-5 sm:p-10 min-h-[calc(100vh-81px)]">    
      <h1 className="font-bold text-3xl">404 Not Found</h1>
      <Link className="font-semibold text-sky-600 hover:underline text-xl" to='/'>Volver a Inicio</Link>
    </main>
  )
}