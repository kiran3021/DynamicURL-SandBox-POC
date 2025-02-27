import React, { useState } from 'react'
import "./UrlCreator.scss";
import { Flex, TextField ,Text } from '@radix-ui/themes';

function UrlCreator({onUrlChangeHandler}) {

  const [textBoxes, setTextBoxes] = useState([""]);
  const [newUrl, setNewUrl] = useState("http://sampleurl/sampleparam1/sampleparam2");

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

  return (
    <div className='container'>
      <div className="external-input-box">
        <Flex direction="column" gap="3" maxWidth="250px">
          <TextField.Root
            color="indigo"
            variant="soft"
            placeholder="Paste Url"
            onChange = {(e)=>setNewUrl(e.target.value)}
          />
        </Flex></div>
      <div className="container-input-box">
        {textBoxes.map((text, index) => (
          <div key={index} className="textbox-container">
            <input
              type="text"
              value={text}
              onChange={(e) => handleChange(index, e.target.value)}
              className="input-box"
              placeholder={index === 0 ? "Base Url" : `Text Box ${index}`}
            />
            <button
              onClick={() => removeTextBox(index)}
              className="remove-input-box-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="formButtons">
        <button
          onClick={onSubmitUrl}
        >
          submit
        </button>
        <button
          onClick={addTextBox}
          className="add-input-box"
        >
          Add Text Box
        </button>
      </div>
      <div className='newUrl-final'>
        <Text size="6">Url : {newUrl}</Text>
      </div>

    </div>
  );
}

export default UrlCreator;
