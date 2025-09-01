import { EmptyState } from "../EmptyState"
import { BrowserIcons } from "../Icons"
import { LinearProgressBasic } from "../LinearProgress"

export function CardBrowserStatistics ({ data }) {

  return (
    <div className="overflow-auto max-h-[310px] p-4 rounded-md border border-zinc-600">
      <h3 className="text-xl sm:text-2xl font-bold mb-1">Navegadores</h3>
      <p className="text-base sm:text-lg text-zinc-200 mb-3">Navegadores más utilizados</p>
      { data?.length === 0 && <EmptyState /> }
      { data?.length > 0 && (
        data.map(browser => {
          const Icon = BrowserIcons[browser.browser_name]
          return (
            <div key={browser.browser_name} className='flex items-center justify-between space-x-8'>
              <div className="flex items-center space-x-3">
                {Icon && <Icon />}
                <h4 className="text-xl font-bold">{browser.browser_name}</h4>
              </div>
              <div className="w-full">
                <LinearProgressBasic value={browser.browser_percentage}/>
              </div>
              <div className='flex flex-col items-center'>
                <h4 className="text-lg font-semibold">{browser.browser_percentage}%</h4>
                <h5 className='-mt-1'>{browser.browser_count}</h5>
              </div>
            </div>
        )}))}
    </div>
  )
}