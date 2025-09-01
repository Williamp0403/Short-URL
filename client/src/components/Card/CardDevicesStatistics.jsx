import { DevicesChart } from "../Chart/DevicesChart";
import { EmptyState } from "../EmptyState";

export function CardDevicesStatistics ({ data }) {

  return (
    <div className="p-4 rounded-md border border-zinc-600">
      <h3 className="text-xl sm:text-2xl font-bold mb-1">Dispositivos</h3>
      <p className="text-base sm:text-lg text-zinc-200 mb-3">Tipos de dispositivos utilizados</p>   
      { data.length === 0 && <EmptyState /> }   
      { data.length > 0 && <DevicesChart data={data}/>}
    </div>
  )
}