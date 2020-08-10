import React from "react";
import "./Location.css";

export const Location = ({ userLocation }) => {
  return (
    <span className="location">
      Your location: {userLocation}
    </span>
  );
};

export default Location;
