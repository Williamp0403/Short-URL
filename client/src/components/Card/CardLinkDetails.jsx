import { formatDate } from "../../utils/formatDate"

export function CardLinkDetails ({ link }) {

  const { name, long_url, short_url, clicks, created_at } = link

  return (
    <ul className="p-4 border border-zinc-600 rounded-md">
      <h3 className="text-xl sm:text-2xl font-bold mb-1">Detalles del enlace</h3>
      <li className="text-base sm:text-lg text-zinc-300">
        <strong>Nombre: </strong> { name ? name : 'Sin título'}
      </li>
      <li className="text-base sm:text-lg text-zinc-300">
        <strong>Enlace corto: </strong>
        <a   
          href={import.meta.env.VITE_BACKEND_URL + short_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-base sm:text-lg hover:underline">
          {import.meta.env.VITE_BACKEND_URL + short_url}
        </a>
      </li>
      <li className="text-base sm:text-lg text-zinc-300 truncate"><strong>Enlace original: </strong>{long_url}</li>
      <li className="text-base sm:text-lg text-zinc-300"><strong>Total clicks: </strong>{clicks}</li>
      <li className="text-base sm:text-lg text-zinc-300">
        <strong>Fecha de creación: </strong>{formatDate(created_at)}</li>
    </ul>
  )
}