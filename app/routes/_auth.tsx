import React from 'react'
import { Outlet } from '@remix-run/react'

function Auth() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Auth