import { Skeleton } from "@mui/material";

export function GeneralStatisticsSkeleton () {
  return (
    <section className='grid md:grid-cols-2 gap-6'>
      <div className="p-4 rounded-md border border-zinc-600">
        <Skeleton variant="text" height={40} width="30%"/>
        <Skeleton variant="text" width="50%" height={25} />
        <Skeleton variant="rectangular" width="100%" height={60} className="mt-3"/>
      </div>
      <div className="p-4 rounded-md border border-zinc-600">
        <Skeleton variant="text" height={40} width="30%"/>
        <Skeleton variant="text" width="50%" height={25} />
        <Skeleton variant="rectangular" width="100%" height={60} className="mt-3"/>
      </div>
    </section>
  )
}