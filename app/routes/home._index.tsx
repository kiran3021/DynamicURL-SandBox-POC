import React from 'react'
import { useState, useEffect } from 'react';
import Iframe from 'src/components/Iframe';
import UrlCreator from 'src/components/UrlCreator';
function HomeIndex() {
    const [url, setUrl] = useState("");
    // const [show ,setShow] = useState(false); 
    const onUrlChangeHandler = (value) => {
        console.log(value);
        setUrl(value);
    };
    
    return (
        <div>
        

        </div>
    )
}

export default HomeIndex