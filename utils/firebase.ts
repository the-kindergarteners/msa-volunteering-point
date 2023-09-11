'use client'

import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { z } from 'zod'

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBbcT3osQ_y1YtCtCXdSsS7jeowF5pGx_g',
  authDomain: 'msa-easyvolunteer.firebaseapp.com',
  projectId: 'msa-easyvolunteer',
  storageBucket: 'msa-easyvolunteer.appspot.com',
  messagingSenderId: '191858912451',
  appId: '1:191858912451:web:689b719dfc4ed49b56c676'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)

export const Account = z.object({
  email: z.string(),
  password: z.string()
})
type Account = z.infer<typeof Account>

export const NewAccount = Account.extend({
  passwordConfirm: z.string()
})
type NewAccount = z.infer<typeof Account>
