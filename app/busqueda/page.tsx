// app/busqueda/page.tsx
export const dynamic = 'force-dynamic'  // evita prerender y fuerza siempre fetch

import BusquedaClient from './BusquedaClient'

interface PageProps {
  searchParams: { search?: string }
}

export default function BusquedaPage({ searchParams }: PageProps) {
  const query = searchParams.search ?? ''
  return <BusquedaClient initialQuery={query} />
}
