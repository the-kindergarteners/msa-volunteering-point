'use client'

import { Container, Spinner } from '@/utils/bootstrap'
import useEvent from '@/utils/use-event'

export default function EventPage({ params }: { params: { id: string } }): React.ReactElement {
  const { status, data: event } = useEvent(params.id)
  return (
    <Container as='main'>
      {status === 'loading' ? <Spinner /> : <>
        <h1>{event.name}</h1>
        <p>{event.date.toLocaleDateString()}</p>
        {event.recruiting
          ? <p>Looking for {event.jobsLeft} more participants.</p>
          : <p>{event.awaiting} candidates are awaiting.</p>}
      </>}
    </Container>
  )
}
