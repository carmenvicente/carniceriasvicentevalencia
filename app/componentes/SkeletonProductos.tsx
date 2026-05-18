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
        <div key={i} className="bg-[rgb(30,30,30)] rounded overflow-hidden animate-pulse">
          {/* Imagen */}
          <div className="w-full aspect-square bg-[rgb(45,45,45)]" />
          {/* Texto */}
          <div className="p-3 space-y-2">
            <div className="h-3 bg-[rgb(45,45,45)] rounded w-3/4" />
            <div className="h-3 bg-[rgb(45,45,45)] rounded w-1/2" />
            <div className="h-4 bg-[rgb(55,20,20)] rounded w-1/3 mt-1" />
          </div>
        </div>
      ))}
    </div>
  )
}
