// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [showForgotForm, setShowForgotForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in both fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(authError || 'Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotMessage('Please enter your email');
      return;
    }

    try {
      // This endpoint should be implemented on backend
      // For now we simulate success
      // await axios.post(`${API_BASE_URL}/users/forgot-password`, { email: forgotEmail });

      setForgotMessage(
        'If an account exists with this email, you will receive a password reset link shortly.'
      );
      setTimeout(() => {
        setShowForgotForm(false);
        setForgotMessage('');
        setForgotEmail('');
      }, 5000);
    } catch (err) {
      setForgotMessage('Something went wrong. Please try again later.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome back! 🌸</h1>
          <p>Login to find your perfect roomie ♡</p>
        </div>

        {displayError && <div className="auth-error">{displayError}</div>}

        {!showForgotForm ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`auth-btn primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="forgot-link">
              <button
                type="button"
                className="text-button"
                onClick={() => setShowForgotForm(true)}
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="auth-form">
            <div className="form-group">
              <label htmlFor="forgotEmail">Enter your email</label>
              <input
                type="email"
                id="forgotEmail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {forgotMessage && (
              <div className="forgot-message">{forgotMessage}</div>
            )}

            <button
              type="submit"
              className="auth-btn primary"
              disabled={loading}
            >
              Send Reset Link
            </button>

            <div className="forgot-link">
              <button
                type="button"
                className="text-button"
                onClick={() => setShowForgotForm(false)}
              >
                ← Back to login
              </button>
            </div>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;