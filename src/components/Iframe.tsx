import React, { useState, useEffect } from 'react';
import './Iframe.scss';

function Iframe() {
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputUrl = e.target.url.value;
    // Basic URL validation
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
      setUrl(inputUrl);
      setShow(true);
    } else {
      alert('Please enter a valid URL starting with http:// or https://');
    }
  };

  return (
    <div className="wrapper-iframe d-flex flex-column mx-3 justify-content-center text-center my-4">
      <div className="row justify-content-center mb-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            className='col-5'
            placeholder="https://example.com"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button type='submit' className='Button gray col-1'>Submit</button>
        </form>
      </div>
      {/* {show && url && ( */}
      <iframe
        className='container iframe bg-gray shadow my-3'
        src={show && url && url}
        title="iframe Example"
        allow='geolocation'
        allowFullScreen
      >
      </iframe>
      {/* )} */}
    </div>
  );
}

export default Iframe;