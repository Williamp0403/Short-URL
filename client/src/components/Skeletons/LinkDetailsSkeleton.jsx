import { Skeleton } from "@mui/material";

export function LinkDetailsSkeleton () {
  return (
    <>
      <div className="p-4 border border-zinc-600 rounded-md">
        <Skeleton variant="text" height={40} width="30%"/>
        <Skeleton variant="text" width="40%" height={25} />
        <Skeleton variant="text" width="40%" height={25} />
        <Skeleton variant="text" width="100%" height={25} />
        <Skeleton variant="text" width="30%" height={25} />
        <Skeleton variant="text" width="40%" height={25} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
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
      </div>
    </>
  )
}