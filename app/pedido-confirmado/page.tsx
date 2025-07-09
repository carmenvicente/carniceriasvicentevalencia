// app/pedido-confirmado/page.tsx
import dynamic from 'next/dynamic'

// Carga dinámica SOLO en cliente
const PedidoConfirmadoClient = dynamic(() => import('./PedidoConfirmadoClient'), {
  ssr: false,
})

export default function Page() {
  return <PedidoConfirmadoClient />
}
