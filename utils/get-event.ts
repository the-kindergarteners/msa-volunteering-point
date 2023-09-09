import { doc, getDoc } from 'firebase/firestore'
import { cache } from 'react'
import { firestore } from './firebase'

// export const revalidate = 3600; // revalidate the data at most every hour

export interface Event {
  id: string
  name: string
  date: Date
  recruiting: boolean
}

export interface AvailableEvent extends Event {
  recruiting: true
  jobsLeft: number
}

export interface UnavailableEvent extends Event {
  recruiting: false
  awaiting: number
}

const getEvent = cache(async function (id: string): Promise<AvailableEvent | UnavailableEvent> {
  const docSnap = await getDoc(doc(firestore, 'events', id))
  if (!docSnap.exists()) throw new ReferenceError()
  const event = docSnap.data()
  const participantsDiff = event['jobs'] - event['participants'].length
  return {
    id: docSnap.id,
    name: event['name'],
    date: event['date'].toDate(),
    ...(participantsDiff > 0
      ? {
          recruiting: true,
          jobsLeft: participantsDiff
        }
      : {
          recruiting: false,
          awaiting: -participantsDiff
        })
  }
})

export default getEvent
