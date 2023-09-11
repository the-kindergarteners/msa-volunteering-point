'use client'

import { useState } from 'react'
import { Alert, Button, Container, Form, Spinner } from '@/utils/bootstrap'
import { logout } from '../actions'

export default function LoginPage (): React.ReactElement {
  const [pending, setPending] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onLogout (): Promise<void> {
    setMessage(null)
    setPending(true)
    const res = await logout()
    if (res.status !== 200) setMessage(res.message)
    setPending(false)
  }

  return (
    <Container>
      {pending ? <h1>
        <Spinner /> Logging out...
      </h1> : null}
      {message == null ? null : <Alert variant='danger'>{message}</Alert>}
      {/* eslint-disable-next-line */}
      <Form action={onLogout}>
        <Button type='submit' className='invisible' ref={(element: HTMLButtonElement) => element?.click()} />
      </Form>
    </Container>
  )
}
