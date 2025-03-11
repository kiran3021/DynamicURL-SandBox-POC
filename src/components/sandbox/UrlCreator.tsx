
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { DataURI, } from "./json";
import { produce } from "immer";
import { Offcanvas } from "react-bootstrap";
import { clsx } from 'clsx';
import { useNavigate } from "react-router";
interface QueryParam {
  key: string;
  value: string;
}

interface TextBoxes {
  baseurl: string;
  environment: string;
  uri: string;
  queryparam: QueryParam[];
  token: string;
}

interface HandleChangeURIParamsEvent {
  target: {
    value: string;
  };
  preventDefault: () => void;
}
const optionsData: TextBoxes = {
  baseurl: "",
  environment: "",
  uri: "",
  queryparam: [{ key: "", value: "" }],
  token: ""
};

const domains = [
  "https://simnetonline.com",
  "https://instuctor.simnetonline.com",
  'https://learner.simnetonline.com'
]
const env = {
  'staging': "Staging",
  "dev": "Dev",
  "qa": "Qa",
  "prod": "Prod",
}

interface UrlCreatorProps {
  query: string;
}

function UrlCreator({ query }: UrlCreatorProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedURI, setSelectedURI] = useState<string[]>([]);
  const [textBoxes, setTextBoxes] = useState({
    baseurl: "",
    environment: "",
    uri: "",
    queryparam: [{ key: "", value: "" }],
    token: ""
  });
  const [newUrl, setNewUrl] = useState(query);
  const [showoff, setShowoff] = useState(true);
  const [render, setRender] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);


  const handleClose = () => setShowoff(false);
  const handleShow = () => setShowoff(true);

  // handle change for the baseURL and environment.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateURL(name, value, "", "addBaseEnv");
    setTextBoxes(
      produce((draft :any) => {
        draft[name] = value;
      })
    );
  };

  // destructuring the query from the url to local object with data passing.
  const urlToObject = (query: string) => {
    console.log(query)
    if (query) {

      const parsedUrl = new URL(query);

      // Extract components
      let baseurl = parsedUrl.protocol + "//" + parsedUrl.hostname.replace(/^[^.]+\./, ""); //
      let environment = parsedUrl.hostname.split(".")[0]; // Get subdomain
      const keys = Object.keys(env);

      // for checking whether environment present in the url or not.
      if (!keys.includes(environment)) {
        baseurl = parsedUrl.origin;
        environment = ""
      }
      if (!parsedUrl.hostname.includes(".")) {

      }
      const uri = parsedUrl.pathname.slice(1); // Split path into an array
      const uriArray = parsedUrl.pathname.split("/").slice(1, uri.length - 1); // Remove the first empty element from the split array
      const queryParams = Array.from(parsedUrl.searchParams.entries()).map(([key, value]) => ({ key, value }));  // making query params as key and value in array

      const result = {
        baseurl,
        environment,
        uri,
        queryparam: queryParams,
        token: "",
      };
      setSelectedURI(uriArray as []);
      setTextBoxes(result);
      setNewUrl(query);
    }
  }

  // handle reset to intial.
  const handleIntial = () => {
    urlToObject(query);
  }

  console.log(query)
  useEffect(() => {
    if (query !== "" || query !== undefined) {
      urlToObject(query);
    } else {
      setNewUrl("")
    }
  }, [query])

  // Handle changes in query parameters
  const handleQueryParamChange = (index: number, field: string, value: string) => {
    setTextBoxes(
      produce((draft) => {
        (draft.queryparam[index] as { key: string; value: string })[field as 'key' | 'value'] = value;
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
  const removeQueryParam = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    setTextBoxes(
      produce((draft) => {
        draft.queryparam = draft.queryparam.filter((_, i) => i !== index);
      })
    );
    updateURL("", "", index, "removeQuery");
  };


  // common function for updating the url obJect before updating locally in state
  const updateurlfun = produce((draft, name, value, index, action) => {

    if (action == "addBaseEnv") {
      draft[name] = value;
    } else if (action == "addQuery") {
      draft.queryparam[index][name] = value;
    } else if (action == "removeQuery") {
      draft.queryparam = draft.queryparam.filter((_: any, i: number) => i !== index);
    }
    setShowoff(true);

  })

  const updateURL = (name = "", value = "", index: string | number = "null", action = "") => {
    let { baseurl, environment, uri, queryparam } = updateurlfun(textBoxes, name, value, index, action)
    baseurl = baseurl.split("//").join(`//${environment}` + (environment != "" ? "." : ""))
    let url = `${baseurl}/${uri}`;


    const queryString: string = queryparam
      .filter((param: QueryParam) => param.key && param.value)
      .map((param: QueryParam) => `${param.key}=${param.value}`)
      .join("&");
    if (queryString) {
      url += `?${queryString}`;
    }
    setNewUrl(url);

  }

  const handleSubmit = () => {
    handleClose();
    setRender(true);
    if (newUrl) {

      navigate(`?url=${newUrl}`);
    } else {
      navigate('/')
    }

  };
  useEffect(() => {
    if (showoff) {
      setRender(false)
    }
    if (!showoff) {
      setRender(true)
    }
  }, [showoff])



  const handleChangeURIParams = (index: number, e: HandleChangeURIParamsEvent) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(index);
    if (index === 0) {
      setSelectedURI([value]);
    } else {
      setSelectedURI(
        produce((draft: string[]) => {
          if (index >= draft.length) {
            // draft.push(...Array(index - draft.length + 1).fill(""));
            draft.push("")
          }
          draft[index] = value;
        })
      );
    }

    let newURI = [...selectedURI];
    newURI[index] = value;
    if (index === 0) {
      newURI = [value];
    }

    let { baseurl, environment, uri, queryparam } = textBoxes;
    baseurl = baseurl.split("//").join(`//${environment}.`);

    let finalUrl = `${baseurl}/${newURI.join("/")}`;

    const queryString = queryparam
      .filter((param) => param.key && param.value)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    if (queryString) {
      finalUrl += `?${queryString}`;
    }

    setTextBoxes(
      produce((draft: TextBoxes) => {
        draft.uri = newURI.join("/");
      })
    );

    setNewUrl(finalUrl);
  };


  const handleReset = () => {

    setNewUrl("");
    setTextBoxes(optionsData);
    setSelectedURI([]);
    getOptionsForLevel(0);

  }

  const URIOptions = useMemo(() => {
    return Object.keys(DataURI);

  }, [DataURI]);

  const getOptionsForLevel = (level: number,) => {

    let currentLevel: { [key: string]: any } = DataURI;
    for (let i = 0; i < level; i++) {
      if (currentLevel && selectedURI[i]) {
        currentLevel = currentLevel[selectedURI[i]];
      } else {
        return [];
      }
    }

    if (currentLevel?.type == "last") {
      return Object.entries(currentLevel?.values)
    }

    return Object.keys(currentLevel || {});
  };

  // for formating the string from the json . based on the key values present in or not.
  const formatString = (input: string) => {

    let words = input.replace(/([A-Z])/g, ' $1').trim();
    let format = words[0].toUpperCase() + words.slice(1)

    return format;
  }


  // for autofocus on the scroll bar  in query parameters 
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [textBoxes.queryparam])

  return (
    <div className="container-fluid container-fluid__sandbox">

      <Offcanvas backdropClassName="offcanvas"  show={showoff} onHide={handleClose} placement="top" >
        <Offcanvas.Body className="py-2" >

          <div className="row d-flex justify-content-center mb-2">
            <div className="col-11 text-center">
              <h4 className="mb-0">SIMnet Lightyear scaffolding tool</h4>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClose} >
              </button>
            </div>
          </div>
          <div className="d-flex row gy-4 gx-2 justify-content-start gap-1 gap-lg-2 align-items-center mb-4">
            <div className="col-12 col-xxl-5 col-lg-8 col-md-9">
              <div className="input-group">
                <label className="input-group-text" htmlFor="uri-input">
                  Paste URL
                </label>
                <input
                  value={newUrl}
                  name="pastedUrl"
                  type="text"
                  className="form-control"
                  id="uri-input"
                  placeholder="Paste Your URL"
                  onChange={(e) => { setNewUrl(e.target.value) }}
                />
              </div>
            </div>
            <div className="col-auto">
              <button type="button" className="Button green col-1" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="Button red col-1" onClick={() => { handleReset() }}
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"

              >
                EMPTY
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="Button red col-1" onClick={() => { handleIntial() }}
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"
              >
                RESET TO INTIAL
              </button>
            </div>

            {/* 
            <button
              type="button"
              className="Button gray"
              // data-bs-dismiss="offcanvas"
              onClick={() => {
                handleClose()
              }}
            >
              CLOSE
            </button> */
            }
          </div>
          <form >
            <div className="form-wrapper row d-flex row-cols-sm-2 justify-content-start gy-4 gx-2 align-items-center mb-3">
              {/* Domain Dropdown */}
              <div className="col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 width">
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
                    aria-label="Select domain"
                  >
                    <option value="">Select</option>
                    {domains.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Environment Dropdown */}
              <div className="col-6 col-xxl-auto col-xl-auto col-lg-auto col-md-auto">
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
                    aria-label="Select environment"
                  >
                    <option value="">Select</option>
                    {Object.entries(env).map(([key, val], index) => (
                      <option key={index} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Dropdowns */}
              {
                selectedURI.concat(getOptionsForLevel(selectedURI.length).length > 0 ? [""] : [])
                  .map((_, index) => (
                    <div className="col-6 col-xxl-auto col-xl-auto col-lg-auto col-md-auto" key={index}>
                      <div className="input-group">
                        {/* Checking whethher data present or not for this particular level. */}
                        {
                          getOptionsForLevel(index).length > 0 &&
                          <>
                            <label className="input-group-text" htmlFor={`param${index + 1}Select`}>
                              Param {index + 1}
                            </label>
                            <select
                              name={`param${index + 1}`}
                              className="form-select"
                              id={`param${index + 1}Select`}
                              value={selectedURI[index] || ""}
                              onChange={(e) => handleChangeURIParams(index, e)}
                              aria-label={`Select parameter ${index + 1}`}
                            >
                              <option value="">Select</option>
                              {getOptionsForLevel(index).map((option, i) => (
                                <option key={i} value={Array.isArray(option) ? option[0] : option}>
                                  {Array.isArray(option) ? (option[1] as string) : formatString(option as string)}
                                </option>
                              ))}
                            </select>
                          </>
                        }
                      </div>
                    </div>
                  ))}
            </div>

            {/* Accordian */}
            <div className="form-query-wrapper row d-flex justify-content-between gap-2 align-items-start">
              <div className="col-12 col-xxl-5 col-xl-6 col-lg-7 col-md-8 my-2">
                {/*Accordian  query parameter  */}
                <div className="accordion" id="accordionPanelsStayOpenExample2">
                  <div className="accordion-item">
                    <div className="accordion-header d-flex justify-content-between ">
                      <button className="accordion-button p-2" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsetwo" aria-expanded={isAccordionOpen} aria-controls="panelsStayOpen-collapsetwo" onClick={() => { setIsAccordionOpen(!isAccordionOpen) }}>
                        <h6 className="my-0">Query Parameters</h6>
                      </button>
                      {isAccordionOpen && (
                        <button
                          type="button"
                          className="Button ml-1 add-param-button"
                          onClick={addQueryParam}
                        >
                          + Add Param
                        </button>
                      )}
                    </div>
                    {/* --body for the query parameters */}
                    <div id="panelsStayOpen-collapsetwo" className="accordion-collapse collapse show" >
                      <div className="accordion-body query-wrapper" ref={containerRef}>
                        {textBoxes?.queryparam?.map((param, index) => (
                          <div key={index} className="d-flex gap-2 mb-3">
                            <div className="d-flex align-items-center gap-0 me-0">
                              <span className="input-group-text col-1 justify-content-center">
                                {index + 1}

                              </span>

                              <div className="col-5 px-2">
                                <label className="input-group-text" htmlFor="query-key" hidden>
                                </label>

                                <input type="text"
                                  id="query-key"
                                  name="key"
                                  placeholder="Key"
                                  value={param.key}
                                  onChange={(e) => handleQueryParamChange(index, "key", e.target.value)}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-5 px-2">
                                <label className="input-group-text" htmlFor="query-value" hidden>
                                </label>

                                <input
                                  id="query-value"
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
                        {/* <button
                          type="button"
                          className="Button gray ml-1 "
                          onClick={addQueryParam}
                        >
                          + Add Param
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordian token  */}
              {/* <div className="col-12 col-lg-6 col-md-6 my-2">
                <div className="accordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button p-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <h6 className="my-0">Access Token </h6>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                      <div className="accordion-body px-4 py-2">
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
              </div> */}
            </div>
          </form>

        </Offcanvas.Body>
      </Offcanvas>


      <div className="d-flex gap-3 justify-content-center align-items-center mb-1 header-wrap">
        {/* offCanvas toggle button  */}
        <button className="Button violet text-center svg" onClick={handleShow}
          type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">          <span className="spanimage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </span>
        </button>
        {/* url display card */}
        <div className="card p-0 my-1 justify-content-center">
          <div className="card-body">URL:{query ? query : "NO URL GENERATED"}</div>
        </div>
      </div>
      {/* iframe */}
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-1">
        {render &&
          <iframe
            className="container-fluid mx-0 iframe bg-gray shadow my-1 border border-black sticky-iframe"
            src={query}
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

export default UrlCreator;
