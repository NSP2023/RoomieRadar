// src/components/ChartWrapper.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Import only what we actually use
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar, Bar, Line } from 'react-chartjs-2';

// Register components once (should be done only once in the app)
ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * Reusable Chart Wrapper Component
 *
 * @param {Object} props
 * @param {'radar' | 'bar' | 'line'} [props.type='radar'] - Type of chart to render
 * @param {Object} props.data - Chart.js data object (labels + datasets)
 * @param {Object} [props.options] - Chart.js options object
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.height] - Optional height (e.g. '400px')
 * @param {string} [props.width] - Optional width (e.g. '100%')
 */
const ChartWrapper = ({
  type = 'radar',
  data,
  options = {},
  className = '',
  height,
  width,
}) => {
  // Default options — especially useful for radar charts
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Nunito', 'Comic Neue', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 245, 240, 0.96)',
        titleColor: '#ff7b8c',
        bodyColor: '#5c4b51',
        borderColor: '#ffb3c1',
        borderWidth: 2,
        cornerRadius: 12,
        padding: 12,
      },
    },
    animation: {
      duration: 1400,
      easing: 'easeOutQuart',
    },
  };

  // Merge default options with user-provided ones
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    // Force responsive behavior
    responsive: true,
    maintainAspectRatio: false,
  };

  // Common props passed to all chart components
  const chartProps = {
    data,
    options: mergedOptions,
    className,
  };

  // Add height/width if provided (useful when not using responsive layout)
  if (height) chartProps.height = height;
  if (width) chartProps.width = width;

  switch (type.toLowerCase()) {
    case 'bar':
      return <Bar {...chartProps} />;
    case 'line':
      return <Line {...chartProps} />;
    case 'radar':
    default:
      return <Radar {...chartProps} />;
  }
};

ChartWrapper.propTypes = {
  type: PropTypes.oneOf(['radar', 'bar', 'line']),
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChartWrapper.defaultProps = {
  type: 'radar',
  options: {},
  className: '',
};

export default ChartWrapper;