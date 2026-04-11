// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import './Auth.css'; // ← keep your existing global auth styles

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();
  const [searchParams]=useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Client-side validation
    if (!formData.name.trim()) {
      setLocalError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setLocalError('Email is required');
      return;
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      const registerData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      await register(registerData);
      navigate('/questionnaire'); 
    } catch (err) {
      setLocalError(authError || 'Registration failed. Please try again.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="app main-content">
      {/* Background decorations */}
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>
      <div className="floating-heart heart-3">💚</div>
      <div className="floating-heart heart-4">💖</div>

      <div className="container auth-container">
        <motion.div
          className="card auth-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="auth-header">
            <span className="logo-icon">🏠✨</span>
            <h2 className="text-gradient">Join RoomieRadar</h2>
            <p>Find your perfect roommate in just a few steps ♡</p>
          </div>

          {displayError && (
            <div className="alert alert-error">
              <span>⚠️</span> {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <div className="form-group">
              <label className="label">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Noshin Syara"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="label">Password</label>
              <div className="input-wrapper password-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="label">Confirm Password</label>
              <div className="input-wrapper password-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="input"
                  placeholder="Min. 6 characters"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide' : 'Show'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-large w-full ${loading ? 'opacity-70 loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'} <UserPlus size={20} />
            </button>
          </form>

          <div className="divider"></div>
          {searchParams.get('error') === 'only_iut_emails' && (
            <div className="alert alert-error">
              <span>⚠️</span> Only @iut-dhaka.edu emails are allowed.
            </div>
          )}

          <div className="divider">
            <span style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>or </span>
          </div>
          <a href="http://localhost:5000/api/users/auth/google" className="auth-btn google-btn"> 
          <img
            src="https://www.google.com/favicon.ico"
            alt=""
            style={{ width: 18, height: 18 }}
          />
            Continue with Google
          </a>
          <p className="auth-footer">
            Already a member?{' '}
            <Link to="/login" className="text-violet">
              Login here
            </Link>
          </p>
          <p className="auth-footer secondary">
            <Link to="/" className="text-violet">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Scoped / component-specific styles */}
      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 40px 20px;
          position: relative;
        }

        .auth-card {
          width: 100%;
          max-width: 460px;
          padding: 40px 32px;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          background: var(--card-bg);
          backdrop-filter: blur(10px);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-icon {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .text-gradient {
          font-size: 2.1rem;
          margin: 0.4rem 0 0.8rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          pointer-events: none;
        }

        .input {
          padding-left: 48px;
          padding-right: 48px; /* space for toggle button */
        }

        .password-wrapper {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 0;
        }

        .w-full {
          width: 100%;
          margin-top: 1rem;
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .text-violet {
          color: var(--secondary-color);
          font-weight: 600;
          text-decoration: none;
        }

        .text-violet:hover {
          text-decoration: underline;
        }

        .secondary {
          margin-top: 0.6rem;
          font-size: 0.9rem;
        }

        .alert-error {
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ef4444;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .google-oauth-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 0.85rem 1rem;
            border: 1.5px solid #ddd;
            background: #fff;
            color: #333;
            border-radius: var(--radius-md);
            font-weight: 500;
            transition: background 0.2s, box-shadow 0.2s;
            cursor: pointer;
            margin-top: 0.5rem;
          }
          .google-oauth-btn:hover {
            background: #f5f5f5;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
      `}</style>
    </div>
  );
};

export default Register;