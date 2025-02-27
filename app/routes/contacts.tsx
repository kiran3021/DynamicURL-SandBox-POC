import { Outlet } from '@remix-run/react'
import React from 'react'

function Contacts() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Contacts