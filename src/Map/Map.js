import React from "react";
import "./Map.css";

export const Map = ({ API, userLatitude, userLongitude }) => {
  const src = `https://www.google.com/maps/embed/v1/place?key=${API}&q=${userLatitude},${userLongitude}&zoom=15&maptype=satellite`;
  return (
    <iframe className="mapframe" title="Google Map" src={src}></iframe>
  );
};

export default Map;
