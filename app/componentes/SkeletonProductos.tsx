interface Props {
  columnas?: 1 | 2
  isMobile?: boolean
  cantidad?: number
}

export default function SkeletonProductos({ columnas = 2, isMobile = false, cantidad = 6 }: Props) {
  const gridClass = isMobile
    ? columnas === 1 ? 'grid-cols-1' : 'grid-cols-2'
    : 'grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {Array.from({ length: cantidad }).map((_, i) => (
        <div
          key={i}
          className="bg-[rgba(0,0,0,0.9)] rounded-lg p-3 sm:p-4 flex flex-col space-y-2 sm:space-y-4 animate-pulse"
        >
          {/* Imagen — mismo ratio que las fotos de producto (8:5) */}
          <div className="w-full aspect-[8/5] bg-[rgb(45,45,45)] rounded" />
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-[rgb(45,45,45)] rounded w-3/4" />
            {/* Precio */}
            <div className="h-3 bg-[rgb(60,20,20)] rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
