import { type Profile, auth, type Account, firestore } from '@/utils/firebase'
import { type User, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function useRegister (): [User | null, (profile: Profile & Account) => void] {
  const [user, setUser] = useState<User | null>(null)
  function register (profile: Profile & Account): void {
    void createUserWithEmailAndPassword(auth, profile.email, profile.password).then(async userCredential => {
      const _user = userCredential.user
      await setDoc(doc(firestore, 'users', _user.uid), {
        ...profile,
        email: undefined,
        password: undefined
      })
      setUser(_user)
    })
  }
  return [user, register]
}
