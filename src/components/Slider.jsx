// src/components/Slider.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Reusable Slider Component
 *
 * Props:
 * - min: number, minimum value
 * - max: number, maximum value
 * - step: number, increment step
 * - value: number, initial value
 * - onChange: function, callback when value changes
 * - label: string, optional label for the slider
 */
const Slider = ({ min = 0, max = 100, step = 1, value = 50, onChange, label }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const val = Number(e.target.value);
    setCurrentValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="flex flex-col w-full mb-4">
      {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="w-full h-2 rounded-lg bg-orange-200 accent-orange-400 cursor-pointer"
      />
      <div className="text-right text-sm text-gray-600 mt-1">{currentValue}</div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default Slider;
