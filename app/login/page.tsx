import { Button, Container, Form, FormControl, FormGroup, FormLabel } from '@/utils/bootstrap'

export default function LoginPage (): React.ReactElement {
  return (
    <Container>
      <Form>
        <FormGroup className='mb-3' controlId='email'>
          <FormLabel>Email address</FormLabel>
          <FormControl type='email' />
        </FormGroup>
        <FormGroup className='mb-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' />
        </FormGroup>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  )
}
