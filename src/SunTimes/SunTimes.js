import React from "react";
import "./SunTimes.css";

export const SunTimes = ({ sunrise, sunset }) => {
  return (
    <div>
      <span>
        {`Time of sunrise: ${sunrise}`}
      </span>
      <br></br>
      <span>
        {`Time of sunset: ${sunset}`}
      </span>
    </div>
  );
};

export default SunTimes;
