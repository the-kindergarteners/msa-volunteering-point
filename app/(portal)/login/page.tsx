'use client'

import { useState } from 'react'
import { Alert, Button, Container, Form, FormControl, FormGroup, FormLabel, Spinner } from '@/utils/bootstrap'
import { login } from '../actions'

export default function LoginPage (): React.ReactElement {
  const [pending, setPending] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onLogin (formData: FormData): Promise<void> {
    setMessage(null)
    setPending(true)
    const res = await login(formData)
    if (res.status !== 200) setMessage(res.message)
    setPending(false)
  }

  return (
    <Container>
      <h1>Login</h1>
      {message == null ? null : <Alert variant='danger'>{message}</Alert>}
      <Form action={formData => { void onLogin(formData) }}>
        <fieldset disabled={pending}>
          <FormGroup className='mb-3' controlId='email'>
            <FormLabel>Email address</FormLabel>
            <FormControl type='email' required name='email' />
          </FormGroup>
          <FormGroup className='mb-3' controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl type='password' autoComplete='current-password' required name='password' />
          </FormGroup>
          <Button type='submit'>
            Login
          </Button>
          {pending ? <Spinner /> : null}
        </fieldset>
      </Form>
    </Container>
  )
}
