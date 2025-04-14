
import React from "react";
import { ClipLoader } from "react-spinners";
import "./GlobalLoader.css"; 

const GlobalLoader = () => {
  return (
    <div className="global-loader">
      <ClipLoader size={50} color="green" />
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default GlobalLoader;
