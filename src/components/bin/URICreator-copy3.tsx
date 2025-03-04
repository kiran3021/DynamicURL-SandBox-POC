
import "./UrlCreator.scss";
import { Offcanvas, Button } from "react-bootstrap";
import { DataURI } from "./json"; // Ensure DataURI is imported correctly
import { produce } from "immer";

const optionsData = {
  baseurl: "",
  environment: "",
  uri: "",
  queryparam: [{ key: "", value: "" }],
  token: "",
};

function UrlCreator({ onUrlChangeHandler }) {
  const [selectedURI, setSelectedURI] = useState([]);
  const [textBoxes, setTextBoxes] = useState(optionsData);
  const [newUrl, setNewUrl] = useState("");
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

  const handleQueryParamChange = (index, field, value) => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam[index][field] = value;
      })
    );
    updateURL(field, value, index, "addQuery");
  };

  const addQueryParam = () => {
    setTextBoxes(
      produce((draft) => {
        draft.queryparam.push({ key: "", value: "" });
      })
    );
  };

  const removeQueryParam = (e, index) => {
    e.preventDefault();
    setTextBoxes(
      produce((draft) => {
        draft.queryparam = draft.queryparam.filter((_, i) => i !== index);
      })
    );
    updateURL("", "", index, "removeQuery");
  };

  const updateURL = (name = "", value = "", index = "", action = "") => {
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
  };

  const handleSubmit = () => {
    setRender(true);
    handleClose();
  };

  useEffect(() => {
    if (showoff) {
      setRender(false);
    }
    if (!showoff) {
      setRender(true);
    }
  }, [showoff]);

  const handleChangeURIParams = (index, e) => {
    const { value } = e.target;

    setSelectedURI(
      produce((draft) => {
        if (index >= draft.length) {
          draft.push(...Array(index - draft.length + 1).fill(""));
        }
        draft[index] = value;
        // Reset all subsequent selections if a higher-level option is changed
        draft.splice(index + 1);
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
    setSelectedURI([]);
  };

  // Generate URI options dynamically based on the selected path
  const getOptionsForLevel = (level) => {
    let currentLevel = DataURI;
    for (let i = 0; i < level; i++) {
      if (currentLevel && selectedURI[i]) {
        currentLevel = currentLevel[selectedURI[i]];
      } else {
        return [];
      }
    }

    // If the current level is a leaf node, return ["Any"]
    if (typeof currentLevel === "string" || !currentLevel) {
      return [];
    }

    return Object.keys(currentLevel || {});
  };

  // Render the component
  return (
    <div className="container-fluid">
      <Offcanvas show={showoff} onHide={handleClose} placement="top">
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
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
            </div>
            <button type="button" className="Button green" onClick={handleSubmit}>
              SUBMIT
            </button>
            <button type="button" className="Button red" onClick={handleReset}>
              RESET
            </button>
            <button type="button" className="Button gray" onClick={handleClose}>
              CLOSE
            </button>
          </div>
          <h6 className="my-1 text-center mx-10">
            <strong>OR</strong>
          </h6>
          <form>
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
                      <option value="">Select</option>
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

            {/* Query Parameters and Token Sections */}
            <div className="d-flex justify-content-between gap-2 align-items-start">
              <div className="col-6 my-2">
                <div className="accordion" id="accordionPanelsStayOpenExample2">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button p-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapsetwo"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapsetwo"
                      >
                        <h6 className="my-0">Query Parameters</h6>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapsetwo" className="accordion-collapse collapse show">
                      <div className="accordion-body px-4 py-2">
                        {textBoxes.queryparam.map((param, index) => (
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
                        <button type="button" className="Button gray" onClick={addQueryParam}>
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
                      <button
                        className="accordion-button p-2 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        <h6 className="my-0">Add Token</h6>
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                      <div className="accordion-body px-4 py-2">
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Key
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Key"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-text">Value</span>
                          <textarea
                            className="form-control"
                            aria-label="With textarea"
                            placeholder="value"
                          ></textarea>
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
        <button className="Button gray text-center" onClick={handleShow}>
          <span style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
        </button>
        <div className="card p-0 my-1 justify-content-center">
          <div className="card-body">Generated URL: {newUrl ? newUrl : "NO URL GENERATED"}</div>
        </div>
      </div>
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        {render && (
          <iframe
            className="container-fluid mx-0 iframe bg-gray shadow my-1 border border-black"
            src={newUrl}
            title="iframe Example"
            allow="geolocation"
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default UrlCreator;