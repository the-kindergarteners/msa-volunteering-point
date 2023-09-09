import { Button, Card, CardBody, CardImg, CardLink, CardSubtitle, CardTitle, Col, Container, Row } from '@/utils/bootstrap'
import Link from 'next/link'
import getEvents from '@/utils/get-events'

export default async function OpportunitiesPage (): Promise<React.ReactElement> {
  const events = await getEvents()
  return (
    <Container as='main'>
      <Row>
        {events.map(event => (
          <Col key={event.id} lg={6} xl={4} className='my-2'>
            <Card>
              <CardImg />
              <CardBody>
                <CardTitle>{event.name}</CardTitle>
                <CardSubtitle>{event.date.toLocaleDateString()}</CardSubtitle>
                <CardLink as={Link} href={`/opportunities/${event.id}`}>Learn more</CardLink>
                {event.recruiting
                  ? (
                    <Button>Claim</Button>
                    )
                  : (
                    <Button disabled>Full</Button>
                    )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
