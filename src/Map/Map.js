import React from "react";
import "./Map.css";

export const Map = ({ API }) => {
  return (
    <iframe className="mapframe" title="Google Map" >
      https://www.google.com/maps/embed/v1/MODE?key={API}&parameters
    </iframe>
  );
};

// https://www.google.com/maps/embed/v1/MODE?key=YOUR_API_KEY&parameters

export default Map;
