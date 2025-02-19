import React from "react";
import './_Main.scss'
function Main() {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Example label
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Another label
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
        />
      </div>
      <ul className="icon-list p-4 d-flex flex-column gap-3 mx-5 bg-primary-subtle border border-primary-subtle rounded-3">
        <div className="bg-secondary-subtle">
        <li><a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">Bootstrap quick start guide</a></li>
        <li><a href="https://getbootstrap.com/docs/5.3/getting-started/webpack/">Bootstrap Webpack guide</a></li>
        <li><a href="https://getbootstrap.com/docs/5.3/getting-started/parcel/">Bootstrap Parcel guide</a></li>
        <li><a href="https://getbootstrap.com/docs/5.3/getting-started/vite/">Bootstrap Vite guide</a></li>
        <li><a href="https://getbootstrap.com/docs/5.3/getting-started/contribute/">Contributing to Bootstrap</a></li>
        </div>

      </ul>
    </>
  );
}

export default Main;
