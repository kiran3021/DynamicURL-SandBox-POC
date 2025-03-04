
import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./_UrlCreator.scss";
import { DataURI, } from "./json";
import { produce } from "immer";
import { Offcanvas } from "react-bootstrap";

import { clsx } from 'clsx';

const optionsData = {
  baseurl: "",
  environment: "",
  uri: "",
  queryparam: [{ key: "", value: "" }],
  token: ""
};
const resuriData = {
  "users": ["instructors", "students"],
  "students": ["group1", "group2"],
  "group1": ["viewall", "dele", "put"],
  "group2": ["one group2", "two group2"],
  "instructors": ["viewall", "dele", "put"]
}


const domains = [
  "https://simnetonline.com",
  "https://instuctor.simnetonline.com",
  'https://learner.simnetonline.com'
]
const env = [
  'staging.',
  "dev.",
  "qa.",
  "prod."
]

function UrlCreator() {
  const [selectedURI, setSelectedURI] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([])
  const [arr, setArr] = useState([])
  const [textBoxes, setTextBoxes] = useState({
    baseurl: "",
    environment: "",
    uri: "",
    queryparam: [{ key: "", value: "" }],
    token: ""
  });
  const [newUrl, setNewUrl] = useState("");
  const [pastedUrl, setPastedUrl] = useState("")
  const [showoff, setShowoff] = useState(true);
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
    let { baseurl, environment, uri, queryparam } = updateurlfun(textBoxes, name, value, index, action)
    console.log(updateurlfun(textBoxes, name, value, index, action));
    // baseurl = baseurl.split('//') +

    baseurl = baseurl.split("//").join(`//${environment}`)
    //  console.log(c.join(b))
    let url = `${baseurl}/${uri}`;


    const queryString = queryparam
      .filter((param) => param.key && param.value)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    if (queryString) {
      url += `?${queryString}`;
    }

    setNewUrl(url);
    // onUrlChangeHandler(url);

  }

  const handleSubmit = () => {
    // updateURL()
    handleClose();
    setRender(true);
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
    e.preventDefault();
    const { value } = e.target;


    console.log(index)
    if (index == 0) {
      setSelectedURI([value])
    } else {
      setSelectedURI(
        produce((draft) => {
          if (index >= draft.length) {
            draft.push(...Array(index - draft.length + 1).fill(""));
          }
          draft[index] = value;
        })
      );

    }

    let newURI = [...selectedURI];
    newURI[index] = value;
    if (index == 0) {
      newURI = [value];
    }

    let { baseurl, environment, uri, queryparam } = textBoxes;
    baseurl = baseurl.split("//").join(`//${environment}`)
    //  console.log(c.join(b))
    // let url = `${baseurl}/${uri}`;

    let finalUrl = `${baseurl}/${newURI.join("/")}`;

    const queryString = queryparam
      .filter((param) => param.key && param.value)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    if (queryString) {
      finalUrl += `?${queryString}`;
    }

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
    setSelectedURI([]);
    setPastedUrl("");
    getOptionsForLevel(0);

  }

  const URIOptions = useMemo(() => {
    return Object.keys(DataURI);

  }, [DataURI]);

  const callback = useCallback(() => {


  }, [])
  // Generate URI options dynamically based on the selected path
  const getOptionsForLevel = (level) => {
    let currentLevel = DataURI;
    for (let i = 0; i < level; i++) {
      if (currentLevel && selectedURI[i]) {
        console.log(selectedURI[i])
        currentLevel = currentLevel[selectedURI[i]];
        console.log(currentLevel)
      } else {
        return [];
      }
    }
    console.log({ currentLevel }, "final")

    if (typeof currentLevel === "string" || !currentLevel) {
      return [];
    }

    return Object.keys(currentLevel || {});
  };

  console.log({ selectedURI })
  // Render the component
  return (
    <div className="container-fluid">
      <Offcanvas show={showoff} onHide={handleClose} placement="top" bac>
      <Offcanvas.Body className="py-2" >
      <div className="offcanvas-header p-2 mb-0">
          <h4 className="mb-0">SIMnet Lightyear scaffolding tool</h4>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClose} ></button>
        </div>
          {/* <div className="container-fluid p-1 mb-4 border border-black bg-body-tertiary text-wrap heading">
            <h4 className="mb-0">➡️{newUrl}</h4>
          </div> */}
          <div className="d-flex justify-content-start gap-2 align-items-center mb-4">
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
            {/* <button
              type="button"
              className="Button gray"
              // data-bs-dismiss="offcanvas"
              onClick={() => {
                handleClose()
              }}
            >
              CLOSE
            </button> */}
          </div>
          <form >
            <div className="row justify-content-start row-cols-5 gy-4 gx-2 align-items-center mb-3">
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
                    {
                      domains.map((ele) => (

                        <option value={ele}>{ele}</option>
                      ))
                    }
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
                    {
                      env.map((ele) => (
                        <option value={ele}>{ele}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              {/* Dynamic Dropdowns */}
              {selectedURI.map((_, index) => (
                <div className="col-2" key={index}>
                  <div className="input-group">
                    <label className="input-group-text" htmlFor={`param${index + 1}Select`}>
                      Param {index + 1}
                    </label>
                    <select
                      name={`param${index + 1}`}
                      className="form-select"
                      id={`param${index + 1}Select`}
                      value={selectedURI[index] || ""}
                      onChange={(e) => handleChangeURIParams(index, e)}
                    >
                      <option value="">Select </option>
                      {getOptionsForLevel(index).map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {/* Add a new dropdown if the last selected value has children */}
              {getOptionsForLevel(selectedURI.length).length > 0 && (
                <div className="col-2">
                  <div className="input-group">
                    <label className="input-group-text" htmlFor={`param${selectedURI.length + 1}Select`}>
                      Param {selectedURI.length + 1}
                    </label>
                    <select
                      name={`param${selectedURI.length + 1}`}
                      className="form-select"
                      id={`param${selectedURI.length + 1}Select`}
                      value=""
                      onChange={(e) => handleChangeURIParams(selectedURI.length, e)}
                    >
                      <option value="">Select</option>
                      {getOptionsForLevel(selectedURI.length).map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

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
                      <div className="accordion-body query-wrapper">
                        {/* --body for the query parameters */}
                        {textBoxes?.queryparam?.map((param, index) => (
                          <div key={index} className="d-flex gap-2 mb-3">

                            <div className="d-flex align-items-center gap-0 me-0">
                              <label className="input-group-text col-1 justify-content-center" htmlFor="UriInput">
                                {index + 1}
                              </label>
                              <div className="col-5 px-2">

                                <input type="text"
                                  name="key"
                                  placeholder="Key"
                                  value={param.key}
                                  onChange={(e) => handleQueryParamChange(index, "key", e.target.value)}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-5 px-2">

                                <input
                                  type="text"
                                  name="value"
                                  placeholder="Value"
                                  value={param.value}
                                  onChange={(e) => handleQueryParamChange(index, "value", e.target.value)}
                                  className="form-control" />
                              </div>

                              <button
                                onClick={(e) => removeQueryParam(e, index)}
                                className="Button gray col-1"
                                aria-label="Close"
                              >
                                <span className="btn-close"></span>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="Button gray ml-1"
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
                        <h6 className="my-0">Access Token </h6>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                      <div className="accordion-body px-4 py-2">
                        {/* --body for the Acces token */}
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
          </form>

      </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex gap-3 justify-content-center align-items-center">
        {/* <button
          className="Button gray text-center"
          // onMouseOver={handleShow}
          onClick={handleShow}
        >
          <span style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
        </button> */}
        <button className="Button gray text-center" onClick={handleShow}
          type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">          <span style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
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
