import { AdsClick } from "@mui/icons-material";
import { EmptyState } from "../EmptyState";

export function CardMostPopularLinks({ links }) { 
  const colorVariants = {
    0: 'bg-yellow-500',
    1: 'bg-zinc-500',
    2: 'bg-yellow-700',
  };

  if (links.length === 0) return <EmptyState text="No hay enlaces creados"/>

  return (
    <div className="flex flex-col gap-y-3">
      {links.map((link, index) => (
        <div key={link.short_url} className="flex space-x-2 sm:space-x-3 items-center">
          <div
            className={`size-6 sm:size-8 text-xs sm:text-base flex items-center justify-center rounded-full font-semibold ${colorVariants[index]}`}
          >
            {index + 1}
          </div>
          <div>
            <a
              href={import.meta.env.VITE_BACKEND_URL + link.short_url}
              className="text-base sm:text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {import.meta.env.VITE_BACKEND_URL + link.short_url}
            </a>
            <div className="flex items-center gap-1 text-zinc-300 font-medium">
              <AdsClick fontSize="small" />
              <span className="text-sm">{link.clicks}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
