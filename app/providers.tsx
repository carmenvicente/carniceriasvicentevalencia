// app/providers.tsx
'use client'

import { CarritoProvider } from './contextos/CarritoContexto'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CarritoProvider>
      {children}
    </CarritoProvider>
  )
}
