'use client'

import React from 'react'
import { Button, Col, Container, Nav, NavItem, NavLink, Row } from '@/utils/bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import { usePathname } from 'next/navigation'
import styles from './sidebar.module.css'

export default function Sidebar(): React.ReactElement {
  const pathname = usePathname()
  const profile = null
  return (
    <Container as='header' fluid className='border-end border-primary border-4 text-bg-dark h-100 p-3 d-flex flex-column'>
      <Row>
        <Col>
          <Image src={logo} alt='MSA Logo' className={styles['msa-logo']} />
        </Col>
      </Row>
      <Row className='flex-fill'>
        <Col>
          <Nav variant="pills" className='flex-column' defaultActiveKey={pathname}>
            <NavItem>
              <NavLink as={Link} href='/opportunities' className={styles['sidebar-item']}>Opportunities</NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} href='/calendar' className={styles['sidebar-item']}>Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} href='/workshops' className={styles['sidebar-item']}>Workshops</NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} href='/profile' className={styles['sidebar-item']}>Profile</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          {profile == null ? (
            <Button as={Link} href='/login'><i className="bi-box-arrow-in-right" /> Log in</Button>
          ) : (
            <>
              <i className='bi-person-circle' style={{ fontSize: '32px' }} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
