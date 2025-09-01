import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CircularProgress from "@mui/material/CircularProgress";
import { LinkOutlined, AdsClick, Star } from "@mui/icons-material"
import { SchemaLink } from "../schemas/link";
import { useLink } from "../hooks/useLink";
import { CardBasic } from "../components/Card/CardBasic";
import { CardMostPopularLinks } from "../components/Card/CardMostPopularLinks";
import { ClicksLast7DaysChart } from "../components/ClicksChart";
import { ModalLink } from "../components/Modal/ModalLink";
import { DashboardSkeleton } from "../components/Skeletons/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { dashboardSummary } from "../services/link";

export function DashboardPage () {
  const { isPending, modalOpen, lastCreatedLink, mutate, setModalOpen } = useLink()
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(SchemaLink)
  })

  const { isLoading, isError, data: summary } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: dashboardSummary
  })

  const onSubmit = handleSubmit(data => {
    const { long_url } = data
    mutate({ long_url })
  })

  return (
    <main className="flex flex-col gap-4 sm:gap-6 p-5 sm:p-10 min-h-[calc(100vh-81px)]">
      <h1 className="text-2xl sm:text-3xl font-semibold">Dashboard</h1>
      
      {isLoading && <DashboardSkeleton /> }
      
      {isError && (
        <div className="text-red-500 font-semibold">
          Ocurrió un error
        </div>
      )}
      
      {!isLoading && !isError && summary && (
        <section className="grid grid-cols-1 auto-rows-min md:grid-cols-3 gap-6">  
          <ModalLink open={modalOpen} setOpen={setModalOpen} link={lastCreatedLink}/>
          <CardBasic 
            title={summary.total_links}
            description="Enlaces totales"  
            icon={LinkOutlined}
            color='blue'
          />
          <CardBasic 
            title={summary.total_clicks}
            description="Clicks totales" 
            icon={AdsClick} 
            color='green'
          />
          <CardBasic 
            title={summary.most_popular}
            description="Enlace más popular"
            icon={Star} 
            color='orange'
          />
          <section className="grid grid-cols-1 md:grid-cols-2 md:col-span-3 gap-6">
            <div className="space-y-12 border border-zinc-600 p-4 rounded-md">
              <div className="space-y-2">
                <h4 className="font-semibold text-xl sm:text-2xl">Creación rápida</h4>
                <p className="text-zinc-200 text-sm sm:text-base">Crea un enlace corto en cuestion de segundos </p>
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
            </div>
            <div className="border border-zinc-600 p-4 rounded-md">
              <h4 className="font-semibold text-xl sm:text-2xl mb-2">Enlaces más populares</h4>
              <CardMostPopularLinks links={summary.top3}/>
            </div>
          </section>
          <section className="border border-zinc-600 rounded-md p-5 hidden md:block md:col-span-3">
            <h4 className="font-semibold text-2xl">Clicks últimos 7 días</h4>
            <ClicksLast7DaysChart data={summary.clicks_last_7_days}/>
          </section>
        </section>
      )}
    </main>
  )
}