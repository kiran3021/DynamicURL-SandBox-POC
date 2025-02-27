import React from 'react'
import Details from './home.details'
import { Outlet } from '@remix-run/react'

function Home() {
    return (
        <div>
            Home..............................
            <Outlet />
        </div>
    )
}

export default Home