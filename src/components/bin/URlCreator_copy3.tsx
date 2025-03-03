
import React, { useState, useMemo } from "react";
import "./UrlCreator.scss";
import { Offcanvas, Button } from "react-bootstrap";
import { DataURI } from "./json";
import { produce } from "immer";

const optionsData = {
  baseurl: "",
  environment: "",
  uri: "",
  queryparam: [{ key: "", value: "" }],
};

function UrlCreator({ onUrlChangeHandler }) {
  const [selectedURI, setSelectedURI] = useState([]);
  const [textBoxes, setTextBoxes] = useState(optionsData);
  const [newUrl, setNewUrl] = useState("");
  const [showoff, setShowoff] = useState(false);

  const handleClose = () => setShowoff(false);
  const handleShow = () => setShowoff(true);

  // Handle changes in base URL, environment, and URI
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextBoxes(
      produce((draft) => {
        draft[name] = value;
      })
    );
    updateURL();
  };

  // Handle changes in query parameters
  const handleQueryParamChange = (index, field, value) => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam[index][field] = value;
      })
    );
    updateURL();
  };

  // Add a new query parameter
  const addQueryParam = () => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam.push({ key: "", value: "" });
      })
    );
  };

  // Remove a query parameter
  const removeQueryParam = (index) => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam.splice(index, 1);
      })
    );
    updateURL();
  };


  const updateURL = () =>{
    const { baseurl, environment, uri, queryparam } = textBoxes;
    let url = `${baseurl}/${environment}/${uri}`;

    const queryString = queryparam
      .filter((param) => param.key && param.value)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    if (queryString) {
      url += `?${queryString}`;
    }
    setNewUrl(url);
    onUrlChangeHandler(url);


  }
  // Update the URL dynamically
  const handleSubmit = () => {
    updateURL()
    handleClose()
    

   

  };

  // Handle changes in URI options
  const handleChangeall = (index, e) => {
    const { value } = e.target;

    setSelectedURI(
      produce((draft) => {
        if (index >= draft.length) {
          draft.push(...Array(index - draft.length + 1).fill(""));
        }
        draft[index] = value;
      })
    );

    const newURI = [...selectedURI];
    newURI[index] = value;
    const finalUrl = `${textBoxes.baseurl}/${textBoxes.environment}/${newURI.join("/")}`;

    setTextBoxes(
      produce((draft) => {
        draft.uri = newURI.join("/");
      })
    );

    setNewUrl(finalUrl);
  };

  // Generate URI options dynamically
  const URIOptions = useMemo(() => {
    return Object.keys(DataURI);
  }, [DataURI]);

  // Render the component
  return (
    <div className="container-fluid">
      <Offcanvas show={showoff} onHide={handleClose} placement="top">
        <Offcanvas.Body>
          <div className="container-fluid border-black text-wrap text-truncate">
            <h4>URL: {newUrl}</h4>
          </div>
          <div className="d-flex justify-content-start gap-3 align-items-center my-2">
            <div className="col-7">
              <div className="input-group">
                <label className="input-group-text" htmlFor="UriInput">
                  Paste URL
                </label>
                <input
                  value={newUrl}
                  name="Uri"
                  type="text"
                  className="form-control"
                  id="URL"
                  placeholder="Paste Your URL"
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
            </div>
            <button type="button" className="Button green" onClick={handleSubmit}>
              Submit
            </button>
            <button
              type="button"
              className="Button red"
              onClick={() => {
                setNewUrl("");
                setTextBoxes(optionsData);
              }}
            >
              Reset
            </button>
          </div>
          <span style={{ paddingLeft: "30%", fontWeight: "bold" }}>OR</span>
          <form className="row justify-content-start row-cols-6 g-2 align-items-center">
            <div className="col-3">
              <div className="input-group">
                <label className="input-group-text" htmlFor="baseUrlSelect">
                  Domain
                </label>
                <select
                  name="baseurl"
                  className="form-select"
                  id="baseUrlSelect"
                  onChange={handleChange}
                >
                  <option value="">Select Domain</option>
                  <option value="http://www.ix.com">http://www.ix.com</option>
                  <option value="https://example.com">https://example.com</option>
                </select>
              </div>
            </div>

            <div className="col-2">
              <div className="input-group">
                <label className="input-group-text" htmlFor="envSelect">
                  Env
                </label>
                <select
                  name="environment"
                  className="form-select"
                  id="envSelect"
                  onChange={handleChange}
                >
                  <option value="">Environment</option>
                  <option value="DEV">DEV</option>
                  <option value="PROD">PROD</option>
                  <option value="QA">QA</option>
                </select>
              </div>
            </div>

            <div className="col-2">
              <div className="input-group">
                <label className="input-group-text" htmlFor="uriSelect">
                  URI Options
                </label>
                <select
                  name="uri"
                  className="form-select"
                  id="uriSelect"
                  onChange={(e) => handleChangeall(0, e)}
                >
                  <option value="">URI Options</option>
                  {URIOptions.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-2">
  <div className="input-group">
    <label className="input-group-text" htmlFor="param2Select">
      Param2
    </label>
    <select
      name="param2"
      className="form-select"
      id="param2Select"
      onChange={(e) => handleChangeall(1, e)}
    >
      <option value="">Param2</option>
      {selectedURI[0] &&
        Object.entries(DataURI?.[selectedURI[0]] || {}).map(([key, val], index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
    </select>
  </div>
</div>

            <div className="col-2">
  <div className="input-group">
    <label className="input-group-text" htmlFor="param3Select">
      Param3
    </label>
    <select
      name="param3"
      className="form-select"
      id="param3Select"
      onChange={(e) => handleChangeall(2, e)}
    >
      <option value="">Param3</option>
      {selectedURI[0] &&
        selectedURI[1] &&
        Object.entries(DataURI?.[selectedURI[0]]?.[selectedURI[1]] || {}).map(([key, val], index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
    </select>
  </div>
</div>

            <div className="col-6 mt-2">
              <h6>Query Parameters:</h6>
              {textBoxes.queryparam.map((param, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <div className="col-auto">
                    <div className="input-group">
                      <label className="input-group-text" htmlFor="UriInput">
                        QP{index + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) =>
                          handleQueryParamChange(index, "key", e.target.value)
                        }
                        className="form-control"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) =>
                          handleQueryParamChange(index, "value", e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeQueryParam(index)}
                    className="Button gray px-1 py-1.3"
                    aria-label="Close"
                  >
                    <span className="btn-close"></span>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="Button gray"
                onClick={addQueryParam}
              >
                + Add Param
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-flex gap-3 justify-content-center align-items-center">
        <button
          className="Button gray text-center"
          onMouseOver={handleShow}
          onClick={handleShow}
        >
          <span style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
        </button>
        <div className="card p-0 my-1 justify-content-center">
          <div className="card-body">Generated URL: {newUrl}</div>
        </div>
      </div>
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        <iframe
          className="container-fluid mx-0 iframe bg-gray shadow my-1 border border-black"
          src={newUrl}
          title="iframe Example"
          allow="geolocation"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}