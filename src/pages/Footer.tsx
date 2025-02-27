import React from "react";

function Footer() {
  return (
    <>
      <div className="container footer">
        <div className="d-flex flex-column g-2 align-items-center ">
          {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-1 my-1 border-top">
            <div className="col mb-6">
              <a href="/" className="d-flex align-items-center text-decoration-none">
                <svg className="bi me-2" width="40" height="32"> x</svg>
              </a>
              <header>Tricon Infotech</header>
              <p>Koramangala, Bangalore</p>
            </div>

            <div className="col mb-3">

            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Features</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Pricing</a></li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-row g-5">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Features</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text">Pricing</a></li>
              </ul>
            </div>
          </div> */}
          <div className="d-flex  ">
            <address aria-labelledby="address">

              <div className="w-100">
                {/* <a href="/" className="d-flex align-items-center text-decoration-none">
                <svg className="bi me-2" width="40" height="32"> x</svg>
              </a> */}
                <h3 id="address" title="company name" aria-label="company name">Tricon Infotech</h3>
                <p id="address" aria-label="company address">Koramangala, Bangalore</p>
              </div>
            </address>

          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-2  border-top" >
            <p>© 2022 Company, Inc. All rights reserved.</p>
            {/* <ul className="list-unstyled d-flex">
              <li className="ms-3"><a className="" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
              <li className="ms-3"><a className="" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
              <li className="ms-3"><a className="" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
