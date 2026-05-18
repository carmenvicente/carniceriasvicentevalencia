// app/providers.tsx
'use client'

import { CarritoProvider } from './contextos/CarritoContexto'
import { FavoritosProvider } from './contextos/FavoritosContexto'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CarritoProvider>
      <FavoritosProvider>
        {children}
      </FavoritosProvider>
    </CarritoProvider>
  )
}
