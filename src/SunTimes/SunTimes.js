import React from "react";
import "./SunTimes.css";

export const SunTimes = ({ className, sunrise, sunset }) => {
  return (
    <div className={className}>
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
