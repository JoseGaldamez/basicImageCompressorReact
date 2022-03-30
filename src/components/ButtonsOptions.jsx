import React from "react";

// eslint-disable-next-line react/prop-types
const ButtonsOptions = ({ click, clearData }) => {
  return (
    <div>
      <button
        type="button"
        className=" btn btn-dark btn-block"
        onClick={e => click(e)}
      >
        Compress
      </button>
      <button
        type="button"
        className=" btn btn-light btn-block"
        onClick={clearData}
      >
        Clear
      </button>
    </div>
  );
};

export default ButtonsOptions;
