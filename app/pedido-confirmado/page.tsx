// app/pedido-confirmado/page.tsx
import dynamic from 'next/dynamic'

// Importación dinámica para evitar errores de prerender
const PedidoConfirmadoClient = dynamic(() => import('./PedidoConfirmadoClient'), {
  ssr: false,
})

export default function Page() {
  return <PedidoConfirmadoClient />
}
