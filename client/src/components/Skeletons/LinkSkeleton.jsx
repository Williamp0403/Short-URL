import { Skeleton } from "@mui/material";

export function LinkSkeleton () {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col gap-2 p-4 border border-zinc-600 rounded-md">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" height={30} width="60%"/>
              <Skeleton variant="circular" height={20} width={20} />
            </div>
            <div>
              <Skeleton variant="text" height={50} width="50%"/>
              <Skeleton variant="text" height={20} width="100%"/>
            </div>
            <Skeleton variant="text" height={30} width="60%"/>
          </div>
        ))}
    </section>
  )
}