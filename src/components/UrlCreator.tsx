import React, { useState, useEffect } from 'react'
import "./UrlCreator.scss";
import { Flex, TextField, Text } from '@radix-ui/themes';

function UrlCreator({ onUrlChangeHandler }) {

  const [textBoxes, setTextBoxes] = useState([""]);
  const [renderPage, setRenderPage] = useState(false)
  const [reset, setReset] = useState("")
  const [reqType,setReqType] = useState("GET");
  const [env,setEnv] = useState("DEV");
  const [newUrl, setNewUrl] = useState("http://sampleurl/sampleparam1/sampleparam2");
  const [show, setShow] = useState(false)
  const addTextBox = () => {
    setTextBoxes([...textBoxes, ""]);
  };
  const removeTextBox = (index) => {
    if (index == 0) return;
    const updatedTextBoxes = textBoxes.filter((_, i) => i !== index);
    setTextBoxes(updatedTextBoxes);
    setNewUrl(updatedTextBoxes.join("/"));
  };

  const handleChange = (index, value: String) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index] = value;
    setTextBoxes(updatedTextBoxes);
    setNewUrl(updatedTextBoxes.join("/"));
    // console.log(newUrl);
  };
  const onSubmitUrl = () => {
    console.log(newUrl);
    setNewUrl(newUrl);
    onUrlChangeHandler(newUrl);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(false);
    }
  }, []);

  return (
    <div className='container'>
      <div className="container container-input-box bg-grey shadow p-4">
        {textBoxes.map((text, index) => (
          <div key={index} className="d-flex gap-2 justify-content-center align-items-center">
            <input
              type="text"
              value={text}
              onChange={(e) => handleChange(index, e.target.value)}
              className="form-control"
              placeholder={index === 0 ? "Base Url" : `Text Box ${index}`}
            />
            <button
              onClick={() => removeTextBox(index)}
              className="Button gray px-1"
              aria-label="Close"
            >
              <span className='btn-close'></span>

            </button>
          </div>
        ))}
      </div>
      <SelectDemo  handleChangeForSelectDemo = {(e)=>{setReqType(e)}} selectLabel={"Request Type"} selectItemList={["POST","GET","PUT","DELETE","UPDATE"]}/>
      <SelectDemo handleChangeForSelectDemo = {setEnv} selectLabel={"Environment"} selectItemList={["DEV","QA","UAT","PROD"]}/>
      <span className='box p-2 bg-grey text-center mb-2'>Or</span>
      <Flex direction="column" gap="3" maxWidth="20rem" justify="center">
        <TextField.Root
          color="indigo"
          variant="surface"
          placeholder="Paste Url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </Flex>
      <div className="d-flex justify-content-center gap-3 align-items-center my-2">
        <button
          onClick={addTextBox}
          className="Button gray"
        >
          Add Text Box
        </button>
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

      <div className="card p-0 my-1">
        <div className="card-body">
          Url : {newUrl}  </div>
      </div>
      <div className="wrapper-iframe d-flex flex-column justify-content-center my-4">
        <iframe
          className='container mx-0 iframe bg-gray shadow my-3'
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
