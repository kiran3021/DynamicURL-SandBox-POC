import React, { useState } from 'react'
import Details from './home.details'
import { Outlet } from '@remix-run/react'
import UrlCreator from "../../src/components/UrlCreator"

function Home() {
   
    
    return (
        <div>
       
            <Outlet />
        </div>
    );
}

export default Home