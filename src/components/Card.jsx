// src/components/Card.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

//Reusable Card Component


const Card = ({ title, children, className, highlight = false }) => {
  const baseStyles =
    "p-4 rounded-xl shadow-md transition-all duration-200 ease-in-out hover:shadow-lg bg-white";

  const highlightStyles = highlight
    ? "border-2 border-orange-400 bg-orange-50"
    : "";

  return (
    <div className={clsx(baseStyles, highlightStyles, className)}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

// Prop types validation
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  highlight: PropTypes.bool
};

export default Card;
