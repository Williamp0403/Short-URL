import { useQuery } from "@tanstack/react-query";
import { LinkOutlined } from "@mui/icons-material";
import { getLinks } from "../services/link";
import { CardLink } from "../components/Card/CardLink";
import { ModalCreateLink } from "../components/Modal/ModalCreateLink";
import { LinkSkeleton } from "../components/Skeletons/LinkSkeleton";

export function LinksPage () {
  const { isLoading, isError, data: links } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks
  })

  return (
    <main className="flex flex-col gap-4 sm:gap-6 min-h-[calc(100vh-81px)] p-5 sm:p-10">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <LinkOutlined fontSize="large"/>
          <h1 className="text-2xl sm:text-3xl font-semibold">Tus enlaces</h1>
        </div>
        <ModalCreateLink/>
      </div>

      {isLoading && <LinkSkeleton />}

      {isError && (
        <div className="text-red-500 font-semibold">
          Ocurrió un error
        </div>
      )}

      {!isLoading && !isError && links?.length === 0 && (
        <div className="text-gray-300 font-medium">
          No tienes enlaces aún. ¡Crea uno nuevo para comenzar!
        </div>
      )}

      {!isLoading && !isError && links?.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map(link => (
            <CardLink key={link.short_url} link={link}/>
          ))}
        </section>
      )}
    </main>
  )
}