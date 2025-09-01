import { BarChart } from "@mui/icons-material";
import { useQuery } from '@tanstack/react-query'
import { CardLinkDetails } from "../components/Card/CardLinkDetails";
import { CardBrowserStatistics } from "../components/Card/CardBrowserStatistics";
import { CardDevicesStatistics } from "../components/Card/CardDevicesStatistics";
import { getLinkStatistics } from "../services/link";
import { useParams } from "react-router-dom";
import { BackToList } from "../components/BackToList";
import { EmptyState } from "../components/EmptyState";
import { LinkDetailsSkeleton } from "../components/Skeletons/LinkDetailsSkeleton";

export function LinkStatisticsPage () {
  const { id } = useParams()
  
  if (isNaN(Number(id))) {
    return (
    <div className="p-5 sm:p-10">
      <BackToList />
      <h1 className="text-red-500 font-semibold text-xl mt-4">Enlace inválido</h1>
    </div> 
    )
  }

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['link-statistics', id],
    queryFn: () => getLinkStatistics(id)
  })

  return (
    <main className="flex flex-col gap-4 sm:gap-6 min-h-[calc(100vh-81px)] p-5 sm:p-10">
      <BackToList />
      <div className="flex items-center gap-x-2">
        <BarChart fontSize="large"/>
        <h1 className="text-2xl sm:text-3xl font-semibold">Estadísticas del enlace</h1>
      </div>

      { isLoading && <LinkDetailsSkeleton />}

      { isError && error?.status === 404 && (
        <EmptyState text="El enlace no existe"/>
      )}

      {isError && error?.status !== 404 && (
        <div className="text-red-500 font-semibold">
          Ocurrió un error al cargar las estadísticas.
        </div>
      )}

      {!isLoading && !isError && data && (
          <>
          <CardLinkDetails link={data}/>
          <div className="grid md:grid-cols-2 gap-5">
            <CardBrowserStatistics data={data?.browsers}/> 
            <CardDevicesStatistics data={data?.devices}/>
          </div>
          </>
        )
      }
    </main>
  )
}