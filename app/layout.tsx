import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shreyash — Full-Stack · Blockchain · AI/ML Engineer',
  description:
    'Portfolio of Shreyash — a hybrid engineer navigating Frontend, Backend, Blockchain, and AI/ML. Built with raw curiosity and a lot of caffeine.',
  keywords: [
    'Shreyash',
    'developer portfolio',
    'full-stack engineer',
    'blockchain developer',
    'AI ML engineer',
    'React developer',
    'Next.js',
    'Solidity',
    'PyTorch',
  ],
  authors: [{ name: 'Shreyash' }],
  openGraph: {
    title: 'Shreyash — Full-Stack · Blockchain · AI/ML Engineer',
    description: 'A hybrid engineer exploring multiple domains.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
