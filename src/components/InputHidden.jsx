import React from "react";
import Card from "react-bootstrap/Card";

const InputHidden = props => {
  // eslint-disable-next-line react/prop-types
  const { onChangeInputImage } = props;

  return (
    <label htmlFor="selectImage">
      <Card.Img
        className="ht"
        variant="top"
        src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
      />
      <input
        type="file"
        id="selectImage"
        hidden
        accept="image/*"
        className="mt-2 btn btn-dark w-75"
        onChange={e => onChangeInputImage(e)}
      />
    </label>
  );
};

export default InputHidden;
