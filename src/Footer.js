import React from "react";

const Footer = ({ length }) => {
  const date = new Date();
  return (
    <div className="footer bg-primary">
      Footer &copy; {date.getFullYear() + `  posts length is ${length}`}
    </div>
  );
};

export default Footer;
