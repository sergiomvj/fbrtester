
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '8Tester Dashboard',
  description: 'Quality Assurance System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-200`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:ml-64 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
