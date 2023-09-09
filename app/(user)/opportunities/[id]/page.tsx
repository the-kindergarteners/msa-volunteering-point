import { Container, Spinner } from '@/utils/bootstrap'
import getEvent from '@/utils/get-event'

export default async function EventPage({ params }: { params: { id: string } }): Promise<React.ReactElement> {
  const event = await getEvent(params.id)
  return (
    <Container as='main'>
      <h1>{event.name}</h1>
      <p>{event.date.toLocaleDateString()}</p>
      {event.recruiting
        ? (
          <p>Looking for {event.jobsLeft} more participants.</p>
        )
        : (
          <p>{event.awaiting} candidates are awaiting.</p>
        )}
    </Container>
  )
}
