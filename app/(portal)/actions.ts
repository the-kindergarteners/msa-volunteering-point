import { Account, NewAccount, auth, firestore } from '@/utils/firebase'
import { Profile } from '@/utils/use-profile'
import { setProperty } from 'dot-prop'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { redirect } from 'next/navigation'

interface ActionResponse {
  status: number
  message: string
}

function parseFormData (formData: FormData): Record<string, FormDataEntryValue> {
  const data: Record<string, FormDataEntryValue> = {}
  formData.forEach((value, key) => setProperty(data, key, value))
  return data
}

export async function login (formData: FormData): Promise<ActionResponse> {
  const formDataRecord = parseFormData(formData)
  const data = Account.parse(formDataRecord)
  try {
    console.log((await signInWithEmailAndPassword(auth, data.email, data.password)).user.uid)
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === 'auth/user-not-found') {
        return {
          status: 404,
          message: 'Cannot find account. Not a member? Register now.'
        }
      }
    }
    return { status: 500, message: 'Unexpected error' }
  }
  redirect('/profile')
}

export async function logout (): Promise<ActionResponse> {
  await signOut(auth)
  redirect('/login')
}

export async function register (formData: FormData): Promise<ActionResponse> {
  const formDataRecord = parseFormData(formData)
  const accountData = NewAccount.parse(formDataRecord)
  if (accountData.password !== accountData.passwordConfirm) { return { status: 400, message: 'Password do not match.' } }
  const { user } = await createUserWithEmailAndPassword(
    auth,
    accountData.email,
    accountData.password
  )
  const profileData = Profile.parse(formDataRecord)
  await updateProfile(user, {
    displayName: `${profileData.firstName} ${profileData.lastName}`
  })
  await setDoc(doc(firestore, 'users', user.uid), profileData)
  redirect('/profile')
}
