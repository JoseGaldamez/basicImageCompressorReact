import React from 'react'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import imageCompression from "browser-image-compression";

export const CompressorPage = () => {


    let [state, setState] = useState({
        originalLink: null,
        originalImage: null,
        outputFileName: null,
        uploadImage: false,
        compressedLink: null,
    });


    const onChangeInputImage =  (e) => {
        const imageFile = e.target.files[0];

        setState({
            ...state,
            originalLink: URL.createObjectURL(imageFile),
            originalImage: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        });
    }

    const click = (e) => {
        e.preventDefault();

        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if (options.maxSizeMB >= state.originalImage.size / 1024) {
            alert("Image is too small, can't be Compressed!");
            return 0;
        }
        let output;

        imageCompression(state.originalImage, options).then( x => {
            output = x;
            const downloadLink = URL.createObjectURL(output);
            console.log(downloadLink);
            setState({
                ...state,
                compressedLink: downloadLink,
                clicked: true
            });

        } );

        setState({ ...state, clicked: true });
        return 1;
    }


    return (
        <div className="container mt-5">
            <h1>Compressor page</h1>
            <hr />
            <div className="text-dark">
                <ul>
                    <strong>Three Simple Steps</strong>
                    <li>1. Upload Image</li>
                    <li>2. Click on Compress</li>
                    <li>3. Download Compressed Image</li>
                </ul>
            </div>

            <div className="row mt-5">

            {/* Upload and watch a image on page */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                { (!state.uploadImage) ? (
                    <Card.Img className="ht" variant="top" src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" />
                    ) : (
                    <Card.Img className="ht" variant="top" src={state.originalLink} />
                ) }
                <div className="d-flex justify-content-center">
                    <input 
                    type="file" 
                    accept="image/*" 
                    className="mt-2 btn btn-dark w-75" 
                    onChange={ e => onChangeInputImage(e)} />
                </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
                
                {state.outputFileName ? (
                <button
                    type="button"
                    className=" btn btn-dark"
                    onClick={e => click(e)}
                >
                    Compress
                </button>
                ) : (
                <></>
                )}
            </div>


            {/* This is the image already compressed  */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                { (!state.clicked) ? (
                    <Card.Img className="ht" variant="top" src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" />
                    ) : (
                        <div>
                            <Card.Img className="ht" variant="top" src={state.compressedLink} />
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
                ) }
                
            </div>

            </div>
        </div>
    )
}
