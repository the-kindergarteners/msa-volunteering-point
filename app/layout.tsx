import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.scss'
import { AuthProvider, FirebaseAppProvider, FirestoreProvider } from '@/utils/reactfire'
import { auth, firebaseConfig, firestore } from '@/utils/firebase'

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
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestore}>
              {children}
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseAppProvider>
      </body>
    </html>
  )
}
