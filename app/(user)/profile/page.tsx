'use client'

import { redirect } from 'next/navigation'
import { Alert, Card, CardImg, Col, Container, ProgressBar, Row, Spinner, Table } from '@/utils/bootstrap'
import styles from './profilepage.module.css'
import classNames from 'classnames'
import useProfile from '@/utils/use-profile'
import { User } from 'firebase/auth'
import { useUser } from 'reactfire'

function ProfileContent({ user }: { user: User }): React.ReactElement {
  const { status, data: profile } = useProfile(user)
  if (status === 'loading') return <Spinner />
  else if (status === 'success') {
    if (profile == null) redirect('/login')
    return (
      <>
        <Row>
          <Col className={styles['profile-main-text']}>
            <h1>Hello, {profile.firstName}</h1>
            <ProgressBar now={27} max={30} label={<span className={styles['progressbar-label']}>27 points</span>} className={styles['progressbar']} />
            <p className={styles['progressbar-subtitle']}>obtain {30 - 27} more points before September 30 to get a volunteer's certificate</p>
            <Table borderless>
              <tbody className={styles['text']}>
                <tr>
                  <th scope='row'>Total points</th>
                  <td className={classNames(styles['table-right-align'], 'text-primary')}>77</td>
                </tr>
                <tr>
                  <th scope='row'>Rank</th>
                  <td className={classNames(styles['table-right-align'], 'text-primary')}>Kindergartener</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md='auto'>
            <Card style={{ width: '180px' }}>
              <CardImg />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className={styles['profile-main-text']}>
            <h2 className={styles['orange-text']}>Recent activities</h2>
            <Table borderless>
              <tbody className={styles['text']}>
                {[{
                  date: new Date(2023, 8, 8),
                  name: 'Activity 1',
                  points: 2
                }].map((activity, i) => (
                  <tr key={i}>
                    <th scope='row'>{activity.date.toLocaleDateString()}</th>
                    <td>{activity.name}</td>
                    <td className={styles['orange-text']}>{activity.points} points</td>
                  </tr>
                ))}
                {[{
                  date: new Date(2023, 8, 2),
                  name: 'Activity 2',
                  points: 2
                }].map((activity, i) => (
                  <tr key={i}>
                    <th scope='row'>{activity.date.toLocaleDateString()}</th>
                    <td>{activity.name}</td>
                    <td className={styles['orange-text']}>{activity.points} points</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className={styles['profile-main-text']}>
            <h2 className={styles['orange-text']}>Certifications</h2>
            <Table borderless>
              <tbody className={styles['text']}>
                {[{
                  name: 'Barista Training',
                  date: new Date()
                }].map((certificate, i) => (
                  <tr key={i}>
                    <th scope='row'>{certificate.name}</th>
                    <td>{certificate.date.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  } 
  else return <Alert variant='danger'>Cannot fetch profile.</Alert>
}

export default function ProfilePage(): React.ReactElement {
  const { status, data: user } = useUser()
  let content: React.ReactElement
  if (status === 'loading') content = <Spinner />
  else if (status === 'success') {
    if (user == null) redirect('/login')
    content = <ProfileContent user={user} />
  }
  else content = <Alert variant='danger'>Unknown error</Alert>
  return (
    <Container as='main' className={styles['container-size']}>
      {content}
    </Container>
  )
}
