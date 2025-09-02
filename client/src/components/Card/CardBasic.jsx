export function CardBasic({ title, description, icon: Icon, color }) {

  const colorVariants = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  }

  return (
    <div className="flex flex-col border border-zinc-600 p-4 rounded-md justify-between">
      <div className="flex justify-between">
        <p className="font-medium text-zinc-200">{description}</p>
        {Icon && (
          <div className={`p-2 sm:p-3 rounded-full ${colorVariants[color]}`}>
            <Icon />
          </div>
        )}
      </div>
      { title === null ? 
        <h2>No hay enlaces creados</h2>    
      : typeof title === 'object' ?
        <a
            href={import.meta.env.VITE_BACKEND_URL + title.short_url}
            className="text-base sm:text-lg hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
          {import.meta.env.VITE_BACKEND_URL + title.short_url}
        </a>
      : <h2 className={`${color === 'orange' ? 'text-base' : 'text-2xl sm:text-3xl'} font-bold`}>
        {title}
        </h2> 
      }
      
    </div>
  )
}