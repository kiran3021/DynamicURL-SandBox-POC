import React, { useState, useEffect } from 'react'
import "./UrlCreator.scss";
import { Flex, TextField, Text } from '@radix-ui/themes';
import SelectDemo from './SelectDemo';
// import { Button, } from '@radix-ui/themes';
import { Offcanvas, Button } from 'react-bootstrap'
import { DropdownMenu } from '@radix-ui/themes'

const optionsData = [
  { baseurl: "" },
  { environment: "" },
  { Uri: "" },
  { queryparam: "" }

]
function UrlCreator({ onUrlChangeHandler }) {

  const [textBoxes, setTextBoxes] = useState([{ name: "" }]);
  const [renderPage, setRenderPage] = useState(false)
  const [reset, setReset] = useState("")
  const [reqType, setReqType] = useState(" ");
  const [env, setEnv] = useState("");
  const [newUrl, setNewUrl] = useState("http://sampleurl/sampleparam1/sampleparam2");
  const [show, setShow] = useState(false)

  const [showoff, setShowoff] = useState(false);

  const handleClose = () => setShowoff(false);
  const handleShow = () => setShowoff(true);
  const addTextBox = () => {
    setTextBoxes();
  };
  // const removeTextBox = (index) => {
  //   if (index == 0) return;
  //   const updatedTextBoxes = textBoxes.filter((_, i) => i !== index);
  //   setTextBoxes(updatedTextBoxes);
  //   setNewUrl(updatedTextBoxes.join("/"));
  // };

  // useEffect(()=>{
  //   if(newUrl == ""){
  //     setRenderPage
  //   }
  // })
  const handleChange = (value: String) => {
    // const updatedTextBoxes = [...textBoxes];
    // updatedTextBoxes[index] = value;
    // setTextBoxes(updatedTextBoxes);

    // setNewUrl(updatedTextBoxes.join("/"));
    // console.log(newUrl);
  };
  const onSubmitUrl = () => {
    console.log(newUrl);
    const updatedTextBoxes = textBoxes;
    if (env !== "") {
      updatedTextBoxes[0] = `${textBoxes[0]}/${env}`
    }
    setNewUrl(updatedTextBoxes.join("/"));
    onUrlChangeHandler(newUrl);
    // setRenderPage(true);
  }
  console.log({ newUrl })
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(false);
    }
  }, []);

  return (
    <div className='container'>

      <Button variant="primary" onClick={handleShow}>
        Open Offcanvas
      </Button>
      {/* <div className="offcanvas off-canvas">  */}

      <Offcanvas backdropClassName='offcanvas' show={showoff} onHide={handleClose} placement='top' name='top' scroll={false} aria-labelledby="off canvas ">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='justifu-content-center'>Select Route</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >

          <div className="container justify-content-center container-input-box bg-grey shadow p-4">
            {/* {textBoxes.map((text, index) => ( */}
            <div className="d-flex gap-2 justify-content-center align-items-center">
              <input
                type="text"
                value=""
                onChange={(e) => handleChange(e.target.value)}
                className="form-control"
                placeholder={"Base Url"}
              />
              {/* <button
                onClick={() => removeTextBox(index)}
                className="Button gray px-1"
                aria-label="Close"
              >
                <span className='btn-close'></span>
              </button> */}
            </div>
            {/* ))} */}
          </div>

          <div className="d-flex gap-5 justify-content-center align-items-center">
            <span>Operation :</span>
            <SelectDemo handleChangeForSelectDemo={(e) => { setReqType(e); }} selectLabel={"Request Type"} selectItemList={["POST", "GET", "PUT", "DELETE", "UPDATE"]} />
            <span>Environment</span>
            <SelectDemo handleChangeForSelectDemo={(e) => setEnv(e)} selectLabel={"Environment"} selectItemList={["DEV", "QA", "UAT", "PROD"]} />
          </div>
          <span className='container text-center my-2'>Or</span>
          {/* <Flex direction="column" className="text-center"  gap="3" maxWidth="20rem" justify="center" align="center">
        <TextField.Root
          color="indigo"
          variant="surface"
          placeholder="Paste Url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </Flex> */}
          <div className="d-flex my-1 w-50 justify-content-center align-items-center mx-auto">
            <label htmlFor="paste" ><span >Paste URL:</span> </label>
            <input
              id='paste'
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="form-control"
              placeholder="Paste the URL"
            />
          </div>
          <div className="d-flex justify-content-center gap-3 align-items-center my-2">
            {/* <button
              onClick={addTextBox}
              className="Button gray"
            >
              Add Text Box
            </button> */}
            <button
              onClick={onSubmitUrl}
              className='Button green'
            >
              submit
            </button>
            <button type='button' className='Button gray' onClick={() => setNewUrl("")}>
              Reset
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* </div> */}
      <div className="card p-0 my-1">
        <div className="card-body">
          Url : {newUrl}  </div>
      </div>
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        <iframe
          className='container mx-0 iframe bg-gray shadow my-3 border border-black'
          src={newUrl}
          title="iframe Example"
          allow='geolocation'
          allowFullScreen
          loading='lazy'
        >
        </iframe>
      </div>
    </div>
  );
}

export default UrlCreator;
