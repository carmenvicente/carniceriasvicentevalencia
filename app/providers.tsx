// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { CarritoProvider } from './contextos/CarritoContexto'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CarritoProvider>
        {children}
      </CarritoProvider>
    </SessionProvider>
  )
}
