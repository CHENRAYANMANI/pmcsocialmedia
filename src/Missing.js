import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <>
      <h4>search correct url</h4>
      <p>
        Visit our <Link to="/"> home </Link> page
      </p>
    </>
  );
};

export default Missing;
