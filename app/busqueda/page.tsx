// app/busqueda/page.tsx
export const dynamic = 'force-dynamic'

import BusquedaClient from './BusquedaClient'

type SearchParamsShape = { search?: string }

export default async function BusquedaPage({
  searchParams,
}: {
  // Next ya infiere que viene como Promise<SearchParamsShape>
  searchParams: Promise<SearchParamsShape>
}) {
  // Desempaqueta la promise:
  const { search: query = '' } = await searchParams

  return <BusquedaClient initialQuery={query} />
}
