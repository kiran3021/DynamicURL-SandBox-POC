import React, { useState } from 'react'
import Details from './home.details'
import { Outlet } from '@remix-run/react'
import UrlCreator from "../../src/components/UrlCreator"

function Home() {
    const [url,setUrl] = useState("");

    const onUrlChangeHandler = (value) => {
        console.log(value);
        setUrl(value);
    };
    
    return (
        <div>
            <UrlCreator onUrlChangeHandler={onUrlChangeHandler} />
            <span>URL: {url}</span>
            <Outlet />
        </div>
    );
}

export default Home