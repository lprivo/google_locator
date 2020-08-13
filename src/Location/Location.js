import React from "react";
import "./Location.css";

export const Location = ({ className, userLocation }) => {
  return (
    <span className={className}>
      Your location: {userLocation}
    </span>
  );
};

// className="location"

export default Location;
