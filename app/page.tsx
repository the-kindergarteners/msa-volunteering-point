'use client'

import Link from "next/link"
import { Nav, NavItem, NavLink } from "@/utils/bootstrap"

export default function Home(): React.ReactElement {
  return (
    <main className='px-4 py-3'>
      Welcome
      <h1>For developers</h1>
      <p>Preview links</p>
      <Nav className='flex-column'>
        <NavItem>
          <NavLink as={Link} href='/opportunities'>Opportunities</NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} href='/calendar'>Calendar</NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} href='/workshops'>Workshops</NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} href='/profile'>Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} href='/login'>Log in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} href='/register'>Register</NavLink>
        </NavItem>
      </Nav>
    </main>
  )
}
