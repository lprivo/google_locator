import React from "react";
import "./Map.css";

export const Map = ({ API }) => {
  const src = `https://www.google.com/maps/embed/v1/MODE?key=${API}&parameters`;
  return (
    <iframe className="mapframe" title="Google Map" src={src}></iframe>
  );
};

export default Map;
