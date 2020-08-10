import React from "react";
import "./Location.css";

export const Location = ({ userLocation }) => {
  return (
    <span>
      Your location: {userLocation}
    </span>
  );
};

// className="location"

export default Location;
