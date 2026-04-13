// src/components/ProgressBar.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * ProgressBar Component
 *
 * Props:
 * - progress: number (0-100), current progress
 * - height: string, height of the bar (default: "8px")
 * - bgColor: string, color of the filled bar (default: "orange")
 * - trackColor: string, background track color (default: "gray-200")
 * - className: string, additional classes
 */
const ProgressBar = ({
  progress = 0,
  height = "8px",
  bgColor = "orange",
  trackColor = "gray-200",
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-${trackColor} rounded-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className={`bg-${bgColor} h-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  height: PropTypes.string,
  bgColor: PropTypes.string,
  trackColor: PropTypes.string,
  className: PropTypes.string,
};

export default ProgressBar;
