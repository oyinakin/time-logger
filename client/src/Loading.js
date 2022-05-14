import React from "react";
import loader from "./asset/loading.svg";

const Loading = () => {
  return (
    <div id="load" className="spinner-loader">
      <div className="load-wrap"></div>
    </div>
  );
};

export default Loading;
