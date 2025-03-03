
import React, { useState, useMemo, useEffect } from "react";
import "./UrlCreator.scss";
import { Offcanvas, Button } from "react-bootstrap";
import { DataURI } from "./json";
import { produce } from "immer";

const optionsData = {
  baseurl: "",
  environment: "",
  uri: "",
  queryparam: [{ key: "", value: "" }],
  token: ""
};

function UrlCreator({ onUrlChangeHandler }) {
  const [selectedURI, setSelectedURI] = useState(["", "", ""]);
  const [textBoxes, setTextBoxes] = useState({
    baseurl: "",
    environment: "",
    uri: "",
    queryparam: [{ key: "", value: "" }],
    token: ""
  });
  const [newUrl, setNewUrl] = useState("");
  const [pastedUrl, setPastedUrl] = useState("")
  const [showoff, setShowoff] = useState(false);
  const [render, setRender] = useState(false);


  const handleClose = () => setShowoff(false);
  const handleShow = () => setShowoff(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    updateURL(name, value, "", "addBaseEnv");
    setTextBoxes(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  // const finalUrl = useMemo(()=>{


  // },[])

  // Handle changes in query parameters
  const handleQueryParamChange = (index, field, value) => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam[index][field] = value;
      })
    );
    updateURL(field, value, index, "addQuery");
  };

  // add query parameter
  const addQueryParam = () => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam.push({ key: "", value: "" });
      })
    );
  };

  // remove queryparam
  const removeQueryParam = (e, index) => {
    e.preventDefault();
    setTextBoxes(
      produce((draft) => {
        draft.queryparam = draft.queryparam.filter((_, i) => i !== index);
      })
    );
    updateURL("", "", index, "removeQuery");
    // setShowoff(true);
  };


  const updateurlfun = produce((draft, name, value, index, action) => {

    if (action == "addBaseEnv") {
      draft[name] = value;
    } else if (action == "addQuery") {
      draft.queryparam[index][name] = value;
    } else if (action == "removeQuery") {
      draft.queryparam = draft.queryparam.filter((_, i) => i !== index);
    }
    setShowoff(true);

  })
  const updateURL = (name = "", value = "", index = "", action = "") => {
    // const { baseurl, environment, uri, queryparam } = textBoxes;
    // if(name !== "" && value !== ""){
    // }
    const { baseurl, environment, uri, queryparam } = updateurlfun(textBoxes, name, value, index, action)
    console.log(updateurlfun(textBoxes, name, value, index, action));
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

  const handleSubmit = () => {
    // updateURL()
    setRender(true);
    handleClose()
  };
  useEffect(() => {
    if (showoff) {
      setRender(false)
    }
    if (!showoff) {
      setRender(true)
    }

  }, [showoff])

  // chnaging the params..
  const handleChangeURIParams = (index, e) => {
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


  const handleReset = () => {
    setNewUrl("");
    setTextBoxes(optionsData);
    setSelectedURI(["", "", ""]);
    setPastedUrl("")

  }

  // Generate URI options dynamically
  const URIOptions = useMemo(() => {
    return Object.keys(DataURI);
    
  }, [DataURI]);

  // Render the component
  return (
    <div className="container-fluid">
      <Offcanvas show={showoff} onHide={handleClose} placement="top" bac>
        <Offcanvas.Body>
          <div className="container-fluid p-1 mb-2 border border-black bg-body-tertiary text-wrap heading">
            <h4 className="mb-0">URL: {newUrl}</h4>
          </div>
          <div className="d-flex justify-content-start gap-2 align-items-center my-1">
            <div className="col-7">
              <div className="input-group">
                <label className="input-group-text" htmlFor="UriInput">
                  Paste URL
                </label>
                <input
                  value={newUrl}
                  name="pastedUrl"
                  type="text"
                  className="form-control"
                  id="URL"
                  placeholder="Paste Your URL"
                  onChange={(e) => { setNewUrl(e.target.value) }}
                />
              </div>
            </div>
            <button type="button" className="Button green" onClick={handleSubmit}>
              SUBMIT
            </button>
            <button
              type="button"
              className="Button red"
              onClick={() => {
                handleReset()
              }}
            >
              RESET
            </button>
            <button
              type="button"
              className="Button gray"
              onClick={() => {
                handleClose()
              }}
            >
              CLOSE
            </button>
          </div>
          <h6 className=" my-1 text-center mx-10"><strong>OR</strong></h6>
          <form >
            <div className="row justify-content-start row-cols-5 gx-2 align-items-center">
              <div className="col-3">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="baseUrlSelect">
                    Domain
                  </label>
                  <select
                    name="baseurl"
                    className="form-select"
                    id="baseUrlSelect"
                    value={textBoxes.baseurl}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
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
                    value={textBoxes.environment}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="DEV">DEV</option>
                    <option value="PROD">PROD</option>
                    <option value="QA">QA</option>
                  </select>
                </div>
              </div>

              <div className="col-3">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="uriSelect">
                    URI Options
                  </label>
                  <select
                    name="uri"
                    className="form-select"
                    id="uriSelect"
                    value={selectedURI?.[0] || ""}
                    defaultValue={"URI Options"}
                    onChange={(e) => handleChangeURIParams(0, e)}
                  >
                    <option value="">Select</option>
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
                    value={selectedURI?.[1] || ""}
                    onChange={(e) => handleChangeURIParams(1, e)}
                  >
                    <option value="">Select</option>
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
                    value={selectedURI?.[2] || ""}
                    onChange={(e) => handleChangeURIParams(2, e)}
                  >
                    <option value="">Select</option>
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
            </div>
            <div className="d-flex justify-content-between gap-2 align-items-start">
              <div className="col-6 my-2">
                <div className="accordion" id="accordionPanelsStayOpenExample2">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button p-2" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsetwo" aria-expanded="true" aria-controls="panelsStayOpen-collapsetwo">
                        <h6 className="my-0">Query Parameters</h6>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapsetwo" className="accordion-collapse collapse show">
                      <div className="accordion-body px-4 py-2">
                        {/* --body for the query parameters */}
                        {textBoxes?.queryparam?.map((param, index) => (
                          <div key={index} className="d-flex gap-2 my-1">
                            <div className="col-auto">
                              <div className="input-group">
                                <label className="input-group-text" htmlFor="UriInput">
                                  QP{index + 1}
                                </label>
                                <input
                                  type="text"
                                  name="key"
                                  placeholder="Key"
                                  value={param.key}
                                  onChange={(e) => handleQueryParamChange(index, "key", e.target.value)}
                                  className="form-control"
                                />
                                <input
                                  type="text"
                                  name="value"
                                  placeholder="Value"
                                  value={param.value}
                                  onChange={(e) => handleQueryParamChange(index, "value", e.target.value)}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <button
                              onClick={(e) => removeQueryParam(e, index)}
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 my-2">
                <div className="accordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button p-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <h6 className="my-0">Add Token</h6>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                      <div className="accordion-body px-4 py-2">
                        {/* --body for the query parameters */}
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">Key

                          </span>
                          <input type="text" className="form-control" placeholder="Key" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group">
                          <span className="input-group-text">Value</span>
                          <textarea className="form-control" aria-label="With textarea" placeholder="value"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <h6 className="my-1">Add token</h6> */}


          </form>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="d-flex gap-3 justify-content-center align-items-center">
        <button
          className="Button gray text-center"
          // onMouseOver={handleShow}
          onClick={handleShow}
        >
          <span style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
        </button>
        <div className="card p-0 my-1 justify-content-center">
          <div className="card-body">Generated URL: {newUrl ? newUrl : "NO URL GENERATED"}</div>
        </div>
      </div>
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        {render &&

          <iframe
            className="container-fluid mx-0 iframe bg-gray shadow my-1 border border-black"
            src={newUrl}
            title="iframe Example"
            allow="geolocation"
            allowFullScreen
            loading="lazy"
          ></iframe>
        }
      </div>
    </div>
  );
}

export default UrlCreator 