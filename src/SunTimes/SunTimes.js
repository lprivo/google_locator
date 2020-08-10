import React from "react";
import "./SunTimes.css";

export const SunTimes = ({ sunrise, sunset }) => {
  return (
    <div>
      <span>
        {`Sun will rise at ${sunrise}`}
      </span>
      <br></br>
      <span>
        {`and it will set at ${sunset}.`}
      </span>
    </div>
  );
};

export default SunTimes;
