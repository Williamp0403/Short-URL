import { SentimentDissatisfied } from "@mui/icons-material";


export function EmptyState ({ text = 'No hay datos para mostrar' }) {

  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="font-semibold text-zinc-400">{text}</p>
      <SentimentDissatisfied sx={{ color: 'gray' }} fontSize="large"/>
    </div>
  )
}