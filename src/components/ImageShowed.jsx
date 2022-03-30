import React from "react";
import Card from "react-bootstrap/Card";

// eslint-disable-next-line react/prop-types
const ImageShowed = ({ originalLink, originalSize }) => {
  return (
    <div>
      <Card.Img className="ht" variant="top" src={originalLink} />
      <p>Original size: {(originalSize / 1024).toFixed(2)} Kbs </p>
    </div>
  );
};

export default ImageShowed;
