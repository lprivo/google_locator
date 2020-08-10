import React from "react";
import "./Localdate.css";

export const LocalDate = ({ localDate }) => {
  return (
    <span className="location">
      Local date: {localDate[0]}-{localDate[1]}-{localDate[2]}
    </span>
  );
};

export default LocalDate;
