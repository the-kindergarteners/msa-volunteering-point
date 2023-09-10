import { Col, Row } from '@/utils/bootstrap'
import Sidebar from './Sidebar'

export default function UserLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <Row className='w-100 vh-100 g-0'>
      <Col md={4} xl={3} className='d-none d-md-block'>
        <Sidebar />
      </Col>
      <Col className='mh-100 overflow-y-auto'>
        {children}
      </Col>
    </Row>
  )
}
