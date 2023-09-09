'use client'

import { type FormEvent } from 'react'
import { Button, Col, Container, Form, Row } from '@/utils/bootstrap'

export default function RegisterPage (): React.ReactElement {
  function submitHandler (e: FormEvent): void {
    e.preventDefault()
  }
  return (
    <Container>
      <Form onSubmit={e => { submitHandler(e) }}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='first-name'>
            <Form.Label>First name</Form.Label>
            <Form.Control required name='firstName' />
          </Form.Group>
          <Form.Group as={Col} controlId='last-name'>
            <Form.Label>Last name</Form.Label>
            <Form.Control required name='lastName' />
          </Form.Group>
        </Row>
        <Form.Group className='mb-3' controlId='student-id'>
          <Form.Label>Student ID</Form.Label>
          <Form.Control required name='id' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' required name='email' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' required name='password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='phone'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control type='tel' name='phone' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='gender'>
          <Form.Label>Gender</Form.Label>
          <Form.Select required name='gender'>
            <option>Select gender...</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='null'>Prefer not to say</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='birthdate'>
          <Form.Label>Birth date</Form.Label>
          <Form.Control type='date' name='birthdate' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='campus'>
          <Form.Label>Campus location</Form.Label>
          <Form.Select required name='campus'>
            <option>Select campus...</option>
            <option value='clayton'>Clayton</option>
            <option value='caulfield'>Caulfield</option>
            <option value='peninsula'>Peninsula</option>
            <option value='parkville'>Parkville</option>
          </Form.Select>
        </Form.Group>
        <fieldset>
          <legend>Home address</legend>
          <Form.Group className='mb-3' controlId='home-street'>
            <Form.Label>Street</Form.Label>
            <Form.Control />
          </Form.Group>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='home-suburb'>
              <Form.Label>Suburb</Form.Label>
              <Form.Control required />
            </Form.Group>
            <Form.Group as={Col} controlId='home-state'>
              <Form.Label>State</Form.Label>
              <Form.Control required />
            </Form.Group>
            <Form.Group as={Col} controlId='home-postcode'>
              <Form.Label>Postcode</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Row>
        </fieldset>
        <Button type='submit'>Register</Button>
      </Form>
    </Container>
  )
}
