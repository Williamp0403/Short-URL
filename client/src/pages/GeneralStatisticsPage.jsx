import { BarChart } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { dashboardTechSummary } from '../services/link'
import { CardBrowserStatistics } from '../components/Card/CardBrowserStatistics'
import { CardDevicesStatistics } from '../components/Card/CardDevicesStatistics'
import { GeneralStatisticsSkeleton } from '../components/Skeletons/GeneralStatisticsSkeleton'

export function GeneralStatisticsPage () {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['dashboardTechSummary'],
    queryFn: dashboardTechSummary
  })

  return (
    <main className="flex flex-col gap-6 min-h-[calc(100vh-81px)] p-5 sm:p-10">
      <div className="flex items-center gap-x-2">
        <BarChart fontSize="large"/>
        <h1 className="text-3xl font-semibold">Estadísticas</h1> 
      </div>

      { isLoading && <GeneralStatisticsSkeleton /> }

      {isError && (
        <div className="text-red-500 font-semibold">
          Ocurrió un error
        </div>
      )}

      { !isLoading && !isError && data && ( 
        <section className='grid md:grid-cols-2 gap-6'>
          <CardBrowserStatistics data={data?.browsers} />       
          <CardDevicesStatistics data={data?.devices}/>
        </section>
      )}
      
    </main>
  )
}