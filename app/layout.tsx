import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MSA EasyVolunteer',
  description: 'Get volunteering and earn points.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
