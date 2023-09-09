import React from 'react'
import App from './App'

export default function UserLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <App>
      {children}
    </App>
  )
}
