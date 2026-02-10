// src/hooks/useForm.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Custom React hook for managing form state, client-side validation, and optional backend submission.
 *
 * Features:
 * - Controlled form values
 * - Client-side validation (optional)
 * - Automatic JWT token handling
 * - Loading & success/error states
 * - Supports POST and PUT methods
 * - Works for both API forms and local-only forms
 *
 * @param {Object} initialValues - Initial form values (e.g. { email: '', password: '' })
 * @param {Function} [validate] - Optional: (values) => ({ field: 'error message', ... })
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.endpoint] - e.g. "/users/login", "/users/register", "/users/profile"
 * @param {string} [options.method] - "POST" | "PUT" (default: "POST")
 * @param {Function} [options.onSuccess] - Called with (response.data, currentValues)
 * @param {Function} [options.onError] - Called with error object
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, validate = null, options = {}) => {
  const {
    endpoint = null,
    method = 'POST',
    onSuccess = () => {},
    onError = () => {},
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input change (text, select, checkbox, radio, file, etc.)
  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;

    let inputValue;

    if (type === 'checkbox') {
      inputValue = checked;
    } else if (type === 'file') {
      inputValue = files[0]; // single file for now
    } else {
      inputValue = value;
    }

    setValues((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    // Clear field-specific error on change
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    // Clear server error when user starts typing again
    setServerError(null);
  }, []);

  // Run client-side validation
  const runValidation = useCallback(() => {
    if (!validate) return {};
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors;
  }, [values, validate]);

  // Submit handler – can be used for both API and local forms
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      setServerError(null);
      setIsSuccess(false);

      // 1. Client-side validation
      const validationErrors = runValidation();

      if (Object.keys(validationErrors).length > 0) {
        return; // stop submission if there are errors
      }

      // 2. If no endpoint → just call success callback (local form)
      if (!endpoint) {
        onSuccess(values);
        return;
      }

      // 3. API submission
      setIsSubmitting(true);

      try {
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        let response;

        if (method.toUpperCase() === 'PUT') {
          response = await axios.put(`${API_BASE_URL}${endpoint}`, values, config);
        } else {
          response = await axios.post(`${API_BASE_URL}${endpoint}`, values, config);
        }

        setIsSuccess(true);
        onSuccess(response.data, values);
      } catch (err) {
        console.error('Form submission error:', err);

        const message =
          err.response?.data?.message ||
          err.message ||
          'Something went wrong. Please try again.';

        setServerError(message);
        onError(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [endpoint, method, values, runValidation, onSuccess, onError]
  );

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  }, [initialValues]);

  // Programmatically update a single field
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return {
    values,
    errors,
    serverError,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues,     // full control (use carefully)
    setErrors,     // full control (use carefully)
  };
};

export default useForm;