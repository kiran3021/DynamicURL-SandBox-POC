import { Outlet } from '@remix-run/react'
import React from 'react'

function Post() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Post