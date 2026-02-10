// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx"; // Optional, for conditional classNames

/**
 * Reusable Button Component
 *
 * Props:
 * - text: string, text to display on button
 * - onClick: function, callback for click event
 * - type: string, 'primary' | 'secondary'
 * - disabled: boolean, disable button
 * - className: string, additional custom classes
 */
const Button = ({ text, onClick, type = "primary", disabled = false, className }) => {
  // Base styles
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Conditional styles
  const typeStyles =
    type === "primary"
      ? "bg-orange-400 text-white hover:bg-orange-500 focus:ring-orange-300"
      : "bg-white text-orange-500 border border-orange-400 hover:bg-orange-50 focus:ring-orange-300";

  return (
    <button
      className={clsx(baseStyles, typeStyles, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

// Prop types validation
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
