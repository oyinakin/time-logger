import React, { useEffect } from "react";

const Alert = ({ text, classNames }) => {
  return <h2 className={classNames}>{text}</h2>;
};

export default Alert;
