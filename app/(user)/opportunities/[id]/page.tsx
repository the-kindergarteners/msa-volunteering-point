import { Container } from '@/utils/bootstrap'
import getEvents from '@/utils/get-events'
import getEvent from '@/utils/get-event'

export async function generateStaticParams (): Promise<{ id: string }[]> {
  const events = await getEvents()

  return events.map(event => ({
    id: event.id
  }))
}

export default async function EventPage ({ params }: { params: { id: string } }): Promise<React.ReactElement> {
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
