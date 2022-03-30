import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import imageCompression from "browser-image-compression";

import "./styles.css";
import Instruccions from "./Instruccions";
import InputHidden from "./InputHidden";
import ImageShowed from "./ImageShowed";
import ButtonsOptions from "./ButtonsOptions";

const CompressorPage = () => {
  const [state, setState] = useState({
    originalLink: null,
    originalImage: null,
    outputFileName: null,
    uploadImage: false,
    compressedLink: null
  });

  const onChangeInputImage = e => {
    const imageFile = e.target.files[0];

    setState({
      ...state,
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
      originalSize: imageFile.size
    });
  };

  const click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }
    let output;

    imageCompression(state.originalImage, options).then(x => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      console.log(downloadLink);
      setState({
        ...state,
        compressedLink: downloadLink,
        clicked: true,
        compressedSize: output.size
      });
    });

    setState({ ...state, clicked: true });
    return 1;
  };

  const clearData = () => {
    setState({
      originalLink: null,
      originalImage: null,
      outputFileName: null,
      uploadImage: false,
      compressedLink: null
    });
  };

  return (
    <div className="container mt-5">
      <h1>Compressor</h1>
      <hr />
      <Instruccions />

      <div className="row mt-5">
        {/* Upload and watch a image on page */}
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
          {!state.uploadImage ? (
            <InputHidden onChangeInputImage={onChangeInputImage} />
          ) : (
            <ImageShowed
              originalLink={state.originalLink}
              originalSize={state.originalSize}
            />
          )}
        </div>

        <div className="col-xl-2 col-lg-2 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          {state.outputFileName ? (
            <ButtonsOptions click={click} clearData={clearData} />
          ) : (
            <></>
          )}
        </div>

        {/* This is the image already compressed  */}
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
          {!state.clicked ? (
            <Card.Img
              className="ht"
              variant="top"
              src="https://i.ibb.co/92Rr7vx/uploaded.jpg"
            />
          ) : (
            <div>
              <Card.Img
                className="ht"
                variant="top"
                src={state.compressedLink}
              />
              <p>
                Compressed size: {(state.compressedSize / 1024).toFixed(2)} Kbs{" "}
              </p>
              <div className="d-flex justify-content-center">
                <a
                  href={state.compressedLink}
                  download={state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <footer>
        <p className="made_by">
          Made by{" "}
          <a
            href="https://josegaldamez.dev"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
          >
            José Galdámez
          </a>
        </p>
      </footer>
    </div>
  );
};

export default CompressorPage;
