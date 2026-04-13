// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSearchParams } from 'react-router-dom';
import './Auth.css';
import './Login.css';

const IUT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@iut-dhaka\.edu$/;

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [searchParams]=useSearchParams();
  const oauthError=searchParams.get('error');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in both fields');
      return;
    }

    if (!IUT_EMAIL_REGEX.test(formData.email)) {
      setLocalError('Only IUT email addresses are allowed (e.g. abc@iut-dhaka.edu)');
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
    if (!IUT_EMAIL_REGEX.test(forgotEmail)) {
      setForgotMessage('Please enter a valid IUT email (e.g. abc@iut-dhaka.edu)');
      return;
    }
    try {
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
          <h1>Welcome back</h1>
          <p>Login to find your perfect roomie</p>
        </div>

        {displayError && <div className="auth-error">{displayError}</div>}
        {oauthError === 'only_iut_emails' && (
          <div className="auth-error">
            Only @iut-dhaka.edu emails are allowed.
          </div>
        )}
        {!showForgotForm ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">IUT Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@iut-dhaka.edu"
                required
                disabled={loading}
              />
              <span className="field-hint">Must be an @iut-dhaka.edu address</span>
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
              <label htmlFor="forgotEmail">Enter your IUT email</label>
              <input
                type="email"
                id="forgotEmail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="abc@iut-dhaka.edu"
                required
              />
            </div>

            {forgotMessage && (
              <div className="forgot-message">{forgotMessage}</div>
            )}

            <button type="submit" className="auth-btn primary" disabled={loading}>
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
        <div className="auth-divider" >
          <span>or</span>
        </div>
        <a href="http://localhost:5000/api/users/auth/google" className="auth-btn google-btn">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            style={{ width: 30, height: 28}}
          />
          <p> Continue with Google</p> 
        </a>
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