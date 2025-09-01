import { Skeleton } from "@mui/material";

export function DashboardSkeleton () {
  return (
    <section className="grid grid-cols-1 auto-rows-min md:grid-cols-3 gap-4 sm:gap-6">
      {/* Skeletons para las tarjetas básicas */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="border border-zinc-600 p-4 rounded-md">
          <div className="flex justify-between">
            <Skeleton variant="text" width="40%" height={20} className="mt-1" />
            <Skeleton variant="circular" width={40} height={40}/>
          </div>
          <Skeleton variant="text" width="70%" height={50} />
        </div>
      ))}
      
      {/* Skeletons para las secciones inferiores */}
      <section className="grid grid-cols-1 md:grid-cols-2 md:col-span-3 gap-4 sm:gap-6">
        <div className="space-y-12 border border-zinc-600 p-4 rounded-md">
          <div className="space-y-2">
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="80%" height={20} />
          </div>
          <div className="flex flex-col">
            <Skeleton variant="text" width="30%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} className="mt-1" />
          </div>
        </div>
        
        <div className="border border-zinc-600 p-4 rounded-md">
          <Skeleton variant="text" width="60%" height={30} />
          {[1, 2, 3].map((item) => (
            <div key={item} className="mt-3">
              <div className="flex gap-3 items-center">
                <Skeleton variant="circular" width={40} height={40}/>
                <Skeleton variant="text" width="80%" height={40} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="border border-zinc-600 p-5 hidden rounded-md md:block md:col-span-3">
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={300} className="mt-4" />
      </div>
    </section>
  )
}