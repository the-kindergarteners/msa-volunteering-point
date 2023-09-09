import { collection, getDocs } from 'firebase/firestore'
import { cache } from 'react'
import { firestore } from './firebase'
import { type AvailableEvent, type UnavailableEvent } from './get-event'

// export const revalidate = 3600; // revalidate the data at most every hour

const getEvents = cache(async function (): Promise<
Array<AvailableEvent | UnavailableEvent>
> {
  const events: Array<AvailableEvent | UnavailableEvent> = []
  const querySnapshot = await getDocs(collection(firestore, 'events'))
  querySnapshot.forEach((doc) => {
    const event = doc.data()
    const participantsDiff = event['jobs'] - event['participants'].length
    events.push({
      id: doc.id,
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
    })
  })
  return events
})

export default getEvents
