// import React, { useState, useEffect, useMemo } from "react";
// import "./UrlCreator.scss";
// import { Offcanvas, Button, Accordion } from "react-bootstrap";
// import { DataURI } from "./json";
// import { produce } from "immer";

// const optionsData = {
//   baseurl: "",
//   environment: "",
//   uri: "",
//   queryparam: [{ key: "", value: "" }]
// };

// function UrlCreator({ onUrlChangeHandler }) {
//   const [selectedURI, setSelectedURI] = useState([])
//   const [textBoxes, setTextBoxes] = useState({
//     baseurl: "",
//     environment: "",
//     uri: "",
//     queryparam: [{ key: "", value: "" }]
//   });
//   const [newUrl, setNewUrl] = useState("");
//   const [showoff, setShowoff] = useState(false);

//   const handleClose = () => setShowoff(false);
//   const handleShow = () => setShowoff(true);

//   //hello
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTextBoxes((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };



//   const handleQueryParamChange = (index, field, value) => {
//     setTextBoxes((prev) => {
//       const updatedParams = [...prev.queryparam];
//       updatedParams[index][field] = value;

//       const { baseurl, environment, uri, queryparam } = textBoxes;
//       let url = `${baseurl}/${environment}/${uri}`;
//       const queryString = updatedParams
//         .filter((param) => param.key && param.value)
//         .map((param) => `${param.key}=${param.value}`)
//         .join("&");
//       if (queryString) {
//         url += `?${queryString}`;
//       }

//       setNewUrl(url);

//       return { ...prev, queryparam: updatedParams };
//     });
//   };
//   // const handleQueryParamChange = (index, field, value) => {
//   //   const updatedParams = [textBoxes.queryparam];
//   //   console.log({updatedParams})
//   //   updatedParams[index][field] = value;
//   //   // if (updatedParams.length == index + 1) addQueryParam();
//   //   console.log(updatedParams.length, " ", index);
//   //   const { baseurl, environment, uri, queryparam } = textBoxes;
//   //   let url = `${baseurl}/${environment}/${uri}`;
//   //   const queryString = updatedParams
//   //     .filter((param) => param.key && param.value)
//   //     .map((param) => `${param.key}=${param.value}`)
//   //     .join("&");
//   //   if (queryString) {
//   //     url += `?${queryString}`;
//   //   }
//   //   setNewUrl(url);
//   //   setTextBoxes((prev) => {
//   //     return { ...prev, queryparam: updatedParams };
//   //   });

//   // };

//   const addQueryParam = () => {
//     setTextBoxes((prev) => ({
//       ...prev,
//       queryparam: [...prev.queryparam, { key: "", value: "" }]
//     }));
//   };

//   // Function to construct URL dynamically
//   const constructUrl = () => {
//     const { baseurl, environment, uri, queryparam } = textBoxes;
//     let url = `${baseurl}/${environment}/${uri}`;

//     const queryString = queryparam
//       .filter((param) => param.key && param.value)
//       .map((param) => `${param.key}=${param.value}`)
//       .join("&");

//     if (queryString) {
//       url += `?${queryString}`;
//     }

//     setNewUrl(url);
//     onUrlChangeHandler(url);
//     // setTimeout(()) 
//     handleClose();
//   };

//   const removeQueryParam = (index) => {
//     setTextBoxes((prev) => ({
//       ...prev,
//       queryparam: prev.queryparam.filter((_, ind) => ind !== index)
//     }))

//   }

//   const handleChangeDomain = (e) => {
//     let newVal = e.target.value;
//     let finalUrl = newVal + "/" + textBoxes.environment + "/" + textBoxes.uri;
//     setTextBoxes(prevState => ({
//       ...prevState,
//       baseurl: newVal
//     }));
//     console.log(textBoxes);
//     setNewUrl(finalUrl);
//   }

//   const handleChangeEnv = (e) => {
//     let newVal = e.target.value;
//     let finalUrl = textBoxes.baseurl + "/" + newVal + "/" + textBoxes.uri;
//     setTextBoxes(prevState => ({
//       ...prevState,
//       environment: newVal
//     }));
//     console.log(textBoxes);
//     setNewUrl(finalUrl);
//   }

//   const handleChangeUri = (e) => {
//     let newVal = e.target.value;

//     let finalUrl = textBoxes.baseurl + "/" + textBoxes.environment + "/" + newVal;
//     setTextBoxes(prevState => ({
//       ...prevState,
//       Uri: newVal
//     }));
//     console.log(textBoxes);
//     setNewUrl(finalUrl);
//   }

//   const URIOptions = useMemo(() => {
//     const s = Object.entries(DataURI).map(([key, value]) => {
//       return key;
//     })
//     return s

//   }, [DataURI]);

//   const handleChangeall = (index, e) => {
//     console.log({ index })

//     const { name, value } = e;
//     const newURI = [...selectedURI];
//     newURI[index] = value;
//     let finalUrl = textBoxes.baseurl + "/" + textBoxes.environment + "/" + newURI.join("/");
//     console.log(finalUrl)
//     setTextBoxes(produce((draft) => {
//       draft.uri = newURI.join('/');

//     }))
//     setNewUrl(finalUrl);
//     setSelectedURI(produce((draft) => {
//       if (index >= draft.length) {
//         draft.push(...Array(index - draft.length + 1).fill(""))
//       }
//       draft[index] = value;
//     }))
//     console.log(finalUrl)
//   }
//   // const handleChangeall = (index, e) => {
//   //   const { value } = e.target; // Extract value from the event
  
//   //   // Update selectedURI immutably
//   //   setSelectedURI((prevSelectedURI) =>
//   //     produce(prevSelectedURI, (draft) => {
//   //       // Ensure the array has enough length
//   //       if (index >= draft.length) {
//   //         // Add empty strings for missing indices
//   //         draft.push(...Array(index - draft.length + 1).fill(''));
//   //       }
//   //       draft[index] = value; // Update the specific index
//   //     })
//   //   );
  
//   //   // Calculate the new URI string
//   //   const newURI = [...selectedURI]; // Create a copy of selectedURI
//   //   if (index >= newURI.length) {
//   //     // Add empty strings for missing indices
//   //     newURI.push(...Array(index - newURI.length + 1).fill(''));
//   //   }
//   //   newURI[index] = value; // Update the specific index
//   //   const finalUrl = `${textBoxes.baseurl}/${textBoxes.environment}/${newURI.join('/')}`;
  
//   //   // Update textBoxes state
//   //   setTextBoxes((prevTextBoxes) =>
//   //     produce(prevTextBoxes, (draft) => {
//   //       draft.uri = newURI.join('/'); // Update the uri field
//   //     })
//   //   );
  
//   //   // Update newUrl state
//   //   setNewUrl(finalUrl);
//   // };


//   console.log({ newUrl })
//   console.log({ textBoxes })
//   console.log({ selectedURI })


//   return (
//     <div className="container-fluid">


//       <Offcanvas show={showoff} onHide={handleClose} placement="top">
//         <Offcanvas.Body>

//           <div className="container-fluid border-black text-wrap text-truncate">
//             <h4>URL: {newUrl}</h4>
//           </div>
//           <div className="d-flex justify-content-start gap-3 align-items-center my-2 ">
//             <div className="col-7">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="UriInput">
//                   Paste url
//                 </label>
//                 <input
//                   value={newUrl}
//                   name="Uri"
//                   type="text"
//                   className="form-control"
//                   id="URL"
//                   placeholder="Paste Your URL"
//                   onChange={(e) => { setNewUrl(e.target.value) }
//                   }
//                 />
//               </div>
//             </div>
//             <button type="button" className="Button green" onClick={constructUrl}>
//               Submit
//             </button>
//             <button
//               type="button"
//               className="Button red"
//               onClick={() => { setNewUrl(""); setTextBoxes(optionsData) }}
//             >
//               Reset
//             </button>
//           </div>
//           <span style={{ paddingLeft: "30%", fontWeight: "bold" }}>OR</span>
//           <form className="row justify-content-start row-cols-6 g-2 align-items-center">
//             <div className="col-3">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="baseUrlSelect">
//                   Domain
//                 </label>
//                 <select
//                   name="baseurl"
//                   className="form-select"
//                   id="baseUrlSelect"
//                   onChange={handleChangeDomain}
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="http://www.ix.com">http://www.ix.com</option>
//                   <option value="https://example.com">https://example.com</option>
//                 </select>
//               </div>
//             </div>

//             <div className="col-2">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="envSelect">
//                   Env
//                 </label>
//                 <select
//                   name="environment"
//                   className="form-select"
//                   id="envSelect"
//                   onChange={handleChangeEnv}
//                   defaultValue={""}
//                 >
//                   <option value="">Environment</option>

//                   <option value="">Choose...</option>
//                   <option value="DEV">DEV</option>
//                   <option value="PROD">PROD</option>
//                   <option value="QA">QA</option>
//                 </select>
//               </div>
//             </div>

//             <div className="col-2">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="envSelect">
//                   URIOptions
//                 </label>
//                 <select
//                   name="environment"
//                   className="form-select"
//                   id="envSelect"
//                   onChange={(e) => {
//                     handleChangeall(0, e);
//                   }}
//                   defaultValue={""}
//                 >
//                   <option value="">URI options</option>
//                   {
//                     URIOptions.map((val, index) => (
//                       <option value={val}>{val}</option>
//                     ))
//                   }
//                 </select>
//               </div>
//             </div>

//             <div className="col-2">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="envSelect">
//                   Param2
//                 </label>
//                 <select
//                   name="environment"
//                   className="form-select"
//                   id="envSelect"
//                   onChange={(e) => {
//                     handleChangeall(1, e);
//                   }}
//                   defaultValue={""}
//                 >
//                   <option value="">Param2</option>
//                   {
//                     selectedURI[0] &&
//                     Object.entries(DataURI?.[selectedURI?.[0]])?.map(([key, val], index) => (
//                       <option value={key}>{key}</option>
//                     ))
//                   }

//                 </select>
//               </div>
//             </div>


//             <div className="col-2">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="envSelect">
//                   Param3
//                 </label>
//                 <select
//                   name="environment"
//                   className="form-select"
//                   id="envSelect"
//                   onChange={(e) => { handleChangeall(2, e) }}
//                   defaultValue={""}
//                 >
//                   <option value="">Param 3</option>
//                   {
//                     selectedURI[0] && selectedURI[1] &&
//                     Object.entries(DataURI?.[selectedURI[0]]?.[selectedURI[1]])?.map(([key, val], index) => (
//                       <option value={val}>{val}</option>
//                     ))
//                   }
//                 </select>
//               </div>
//             </div>

//             {/* <div className="col-3">
//               <div className="input-group">
//                 <label className="input-group-text" htmlFor="UriInput">
//                   URI
//                 </label>
//                 <input
//                   name="Uri"
//                   type="text"
//                   className="form-control"
//                   id="UriInput"
//                   placeholder="URI Parameters"
//                   onChange={handleChangeUri}
//                 />
//               </div>
//             </div> */}
//             {/* <div className="col-6 mt-2">
//             <Accordion defaultActiveKey="0" style={{"height" : "15rem"}}>
//               <Accordion.Item eventKey="0">
//                 <Accordion.Header>Accordion Item #1</Accordion.Header>
//                 <Accordion.Body>
//                     <h6>Query Parameters:</h6>
//                     {textBoxes.queryparam.map((param, index) => (
//                       <div key={index} className="d-flex gap-2 mb-2">
//                         <div className="col-auto">
//                           <div className="input-group">
//                             <label className="input-group-text" htmlFor="UriInput">
//                               QP{index + 1}
//                             </label>

//                             <input
//                               type="text"
//                               placeholder="Key"
//                               value={param.key}
//                               onChange={(e) =>
//                                 handleQueryParamChange(index, "key", e.target.value)
//                               }
//                               className="form-control "
//                             />
//                             <input
//                               type="text"
//                               placeholder="Value"
//                               value={param.value}
//                               onChange={(e) =>
//                                 handleQueryParamChange(index, "value", e.target.value)
//                               }
//                               className="form-control"
//                             />
//                             <button
//                               onClick={() => removeQueryParam(index)}
//                               className="Button gray py-1.5"
//                               aria-label="Close"
//                             >
                              
//                               <span className='btn-close'></span>
//                             </button>
//                           </div>
//                         </div>

//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="Button gray"
//                       onClick={addQueryParam}
//                     >
//                       + Add Param
//                     </button>
//                 </Accordion.Body>
//               </Accordion.Item>
//             </Accordion>
//                   </div> */}


//             <div className="col-6 mt-2">
//               <h6>Query Parameters:</h6>
//               {textBoxes.queryparam.map((param, index) => (
//                 <div key={index} className="d-flex gap-2 mb-2">
//                   <div className="col-auto">
//                     <div className="input-group">
//                       <label className="input-group-text" htmlFor="UriInput">
//                         QP{index + 1}
//                       </label>

//                       <input
//                         type="text"
//                         placeholder="Key"
//                         value={param.key}
//                         onChange={(e) =>
//                          { handleQueryParamChange(index, "key", e.target.value)}

//                         }
//                         className="form-control "
//                       />
//                       <input
//                         type="text"
//                         placeholder="Value"
//                         value={param.value}
//                         onChange={(e) =>
//                           handleQueryParamChange(index, "value", e.target.value)
//                         }
//                         className="form-control"
//                       />

//                     </div>
//                   </div>

//                   <button
//                     onClick={() => removeQueryParam(index)}
//                     className="Button gray px-1 py-1.3"
//                     aria-label="Close"
//                   >
//                     <span className='btn-close'></span>
//                   </button>

//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="Button gray"
//                 onClick={addQueryParam}
//               >
//                 + Add Param
//               </button>
//             </div>


//             {/* <div className="d-flex justify-content-center gap-3 align-items-center my-2">
//               <button type="button" className="btn btn-success" onClick={constructUrl}>
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => setNewUrl("")}
//               >
//                 Reset
//               </button>
//             </div> */}
//           </form>

//         </Offcanvas.Body>
//       </Offcanvas>
//       <div className="d-flex gap-3 justify-content-center align-items-center">
//         <button className="Button gray text-center" onMouseOver={handleShow} onClick={handleShow}>
//           <span className="" style={{ width: "2rem", height: "1rem" }}> ⏬ </span>
//         </button>
//         <div className="card p-0 my-1 justify-content-center">
//           <div className="card-body">Generated URL: {newUrl}</div>
//         </div>

//       </div>
//       <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
//         <iframe
//           className="container-fluid mx-0 iframe bg-gray shadow my-1 border border-black"
//           src={newUrl}
//           title="iframe Example"
//           allow="geolocation"
//           allowFullScreen
//           loading="lazy"
//         ></iframe>
//       </div>
//     </div>
//   );
// }

// export default UrlCreator;