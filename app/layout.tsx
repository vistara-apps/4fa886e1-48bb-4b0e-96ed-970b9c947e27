import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { CosmicBackground } from './components/CosmicBackground'

export const metadata: Metadata = {
  title: 'AdRemix - AI Ad Generation',
  description: 'Spin up viral ad variations and auto-post them',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CosmicBackground />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
