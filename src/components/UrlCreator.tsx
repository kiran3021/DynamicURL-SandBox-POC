import React, { useState, useEffect } from "react";
import "./UrlCreator.scss";
import { Offcanvas, Button, Accordion } from "react-bootstrap";

const optionsData = {
  baseurl: "",
  environment: "",
  Uri: "",
  queryparam: [{ key: "", value: "" }]
};

function UrlCreator({ onUrlChangeHandler }) {
  const [textBoxes, setTextBoxes] = useState({
    baseurl: "",
    environment: "",
    Uri: "",
    queryparam: [{ key: "", value: "" }]
  });
  const [newUrl, setNewUrl] = useState("");
  const [showoff, setShowoff] = useState(false);

  const handleClose = () => setShowoff(false);
  const handleShow = () => setShowoff(true);

  //hello
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextBoxes((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQueryParamChange = (index, field, value) => {
    setTextBoxes((prev) => {
      const updatedParams = [...prev.queryparam];
      updatedParams[index][field] = value;

      const { baseurl, environment, Uri, queryparam } = textBoxes;
      let url = `${baseurl}/${environment}/${Uri}`;
      const queryString = updatedParams
        .filter((param) => param.key && param.value)
        .map((param) => `${param.key}=${param.value}`)
        .join("&");
      if (queryString) {
        url += `?${queryString}`;
      }

      setNewUrl(url);

      return { ...prev, queryparam: updatedParams };
    });
  };

  const addQueryParam = () => {
    setTextBoxes((prev) => ({
      ...prev,
      queryparam: [...prev.queryparam, { key: "", value: "" }]
    }));
  };

  // Function to construct URL dynamically
  const constructUrl = () => {
    const { baseurl, environment, Uri, queryparam } = textBoxes;
    let url = `${baseurl}/${environment}/${Uri}`;

    const queryString = queryparam
      .filter((param) => param.key && param.value)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    if (queryString) {
      url += `?${queryString}`;
    }

    setNewUrl(url);
    onUrlChangeHandler(url);
    // setTimeout(()) 
    handleClose();
  };

  const removeQueryParam = (index) => {
    setTextBoxes((prev) => ({
      ...prev,
      queryparam: prev.queryparam.filter((_, ind) => ind !== index)
    }))

  }

  const handleChangeDomain = (e) => {
    let newVal = e.target.value;
    let finalUrl = newVal + "/" + textBoxes.environment + "/" + textBoxes.Uri;
    setTextBoxes(prevState => ({
      ...prevState,
      baseurl: newVal
    }));
    console.log(textBoxes);
    setNewUrl(finalUrl);
  }

  const handleChangeEnv = (e) => {
    let newVal = e.target.value;
    let finalUrl = textBoxes.baseurl + "/" + newVal + "/" + textBoxes.Uri;
    setTextBoxes(prevState => ({
      ...prevState,
      environment: newVal
    }));
    console.log(textBoxes);
    setNewUrl(finalUrl);
  }

  const handleChangeUri = (e) => {
    let newVal = e.target.value;
    let finalUrl = textBoxes.baseurl + "/" + textBoxes.environment + "/" + newVal;
    setTextBoxes(prevState => ({
      ...prevState,
      Uri: newVal
    }));
    console.log(textBoxes);
    setNewUrl(finalUrl);
  }



  return (
    <div className="container">
      <Button variant="primary" onMouseOver={handleShow}>
        ⏬
      </Button>

      <Offcanvas show={showoff} onHide={handleClose} placement="top">
        <Offcanvas.Body>
          <h1>URL : {newUrl}</h1>
          <div className="d-flex justify-content-start gap-3 align-items-center my-2 ">
            <div className="col-7">
              <div className="input-group">
                <label className="input-group-text" htmlFor="UriInput">
                  Paste url
                </label>
                <input
                  value={newUrl}
                  name="Uri"
                  type="text"
                  className="form-control"
                  id="URL"
                  placeholder="Paste Your URL"
                  onChange={(e) => { setNewUrl(e.target.value) }
                  }
                />
              </div>
            </div>
            <button type="button" className="Button green" onClick={constructUrl}>
              Submit
            </button>
            <button
              type="button"
              className="Button red"
              onClick={() => { setNewUrl(""); setTextBoxes(optionsData) }}
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
                  onChange={handleChangeDomain}
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
                  onChange={handleChangeEnv}
                  defaultValue={""}
                >
                  <option value="">Choose...</option>
                  <option value="DEV">DEV</option>
                  <option value="PROD">PROD</option>
                  <option value="QA">QA</option>
                </select>
              </div>
            </div>

            <div className="col-3">
              <div className="input-group">
                <label className="input-group-text" htmlFor="UriInput">
                  URI
                </label>
                <input
                  name="Uri"
                  type="text"
                  className="form-control"
                  id="UriInput"
                  placeholder="URI Parameters"
                  onChange={handleChangeUri}
                />
              </div>
            </div>
            {/* <div className="col-6 mt-2">
            <Accordion defaultActiveKey="0" style={{"height" : "15rem"}}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
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
                              className="form-control "
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
                            <button
                              onClick={() => removeQueryParam(index)}
                              className="Button gray py-1.5"
                              aria-label="Close"
                            >
                              
                              <span className='btn-close'></span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                    <button
                      type="button"
                      className="Button gray"
                      onClick={addQueryParam}
                    >
                      + Add Param
                    </button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
                  </div> */}


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
                        className="form-control "
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
                    <span className='btn-close'></span>
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


            {/* <div className="d-flex justify-content-center gap-3 align-items-center my-2">
              <button type="button" className="btn btn-success" onClick={constructUrl}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setNewUrl("")}
              >
                Reset
              </button>
            </div> */}
          </form>

        </Offcanvas.Body>
      </Offcanvas>

      <div className="card p-0 my-1">
        <div className="card-body">Generated URL: {newUrl}</div>
      </div>

      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        <iframe
          className="container mx-0 iframe bg-gray shadow my-3 border border-black"
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

export default UrlCreator;
