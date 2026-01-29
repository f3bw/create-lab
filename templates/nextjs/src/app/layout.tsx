import type { Metadata } from 'next'
import { Header } from '@/components/header'
import '@/styles/global.css'

export const metadata: Metadata = {
    title: 'Next.js Lab',
    description: 'Next.js experiment playground',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    )
}
