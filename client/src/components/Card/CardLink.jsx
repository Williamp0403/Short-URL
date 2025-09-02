import { AdsClick, CalendarToday } from "@mui/icons-material"
import { formatDate } from "../../utils/formatDate"
import { Copy } from "../Copy"
import { Dropdown } from "../Dropdown"

export function CardLink ({ link }) {
  
  const shortUrl = `${import.meta.env.VITE_BACKEND_URL + link.short_url}`

  return (
    <div className="flex flex-col gap-3 p-4 border border-zinc-600 rounded-md">
      <div>
        <div className="flex items-start justify-between">
          <h2 className={`${link.name ? 'text-white' : 'text-zinc-400'} text-lg font-bold truncate`}>
            {link.name ? link.name : 'Sin título'}
          </h2>
          <Dropdown link={link}/>
        </div>
        <div className="flex items-center">
          <a  
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-600 bg-zinc-700/50 rounded py-1 px-2 font-bold hover:underline truncate"
          >
            {shortUrl}
          </a>
          <Copy text={shortUrl}/>
        </div>
        <h4 className=" text-zinc-300 truncate">{link.long_url}</h4>
      </div>
      <div className="flex items-center text-sm gap-10 border-t border-zinc-600 pt-3 text-zinc-300 font-medium">
        <div className="flex items-center gap-1">
          <CalendarToday fontSize="small"/>
          <span>{formatDate(link.created_at, false)}</span>
        </div>
        <div className="flex items-center gap-1">
          <AdsClick fontSize="small"/>
          <span>{link.clicks}</span>
        </div>
      </div>
    </div>
  )
}