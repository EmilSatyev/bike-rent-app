import React from "react";

const Helmet = ({ children, title }) => {
  document.title = "BikePark - " + title;
  return <>{children}</>;
};

export default Helmet;