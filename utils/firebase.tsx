import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
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

export interface Account {
  email: string
  password: string
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'FEMALE',
  NULL = 'null',
}

export interface Profile {
  firstName: string
  lastName: string
  birthdate: Date
  gender: Gender
  home: {
    street: string
    suburb: string
    state: string
    postcode: number
  }
}
