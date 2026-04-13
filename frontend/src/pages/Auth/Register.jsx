import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Eye, EyeOff, Calendar, Building, Hash } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import './Register.css';

const IUT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@iut-dhaka\.edu$/;
const STUDENT_ID_REGEX = /^\d{6,12}$/;

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();
  const [searchParams]=useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    age: '',
    hall: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.name.trim()) {
      setLocalError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setLocalError('Email is required');
      return;
    }
    if (!IUT_EMAIL_REGEX.test(formData.email)) {
      setLocalError('Only IUT email addresses are allowed (e.g. abc@iut-dhaka.edu)');
      return;
    }
    if (!formData.studentId.trim()) {
      setLocalError('Student ID is required');
      return;
    }
    if (!STUDENT_ID_REGEX.test(formData.studentId.trim())) {
      setLocalError('Please enter a valid IUT student ID (numbers only)');
      return;
    }
    if (!formData.age || formData.age < 16) {
      setLocalError('Please enter a valid age (16+)');
      return;
    }
    if (!formData.hall.trim()) {
      setLocalError('Please specify your hall of residence');
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
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        studentId: formData.studentId.trim(),
        password: formData.password,
        age: formData.age,
        hall: formData.hall.trim(),
      });
      navigate('/questionnaire');
    } catch (err) {
      setLocalError(authError || 'Registration failed. Please try again.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="app main-content">
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
            <span className="logo-icon"></span>
            <h2 className="text-gradient">Join RoomieRadar</h2>
            <p>Find your perfect roommate in just a few steps </p>
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
                  placeholder="Name "
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* IUT Email */}
            <div className="form-group">
              <label className="label">IUT Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="abc@iut-dhaka.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <span className="field-hint">Only @iut-dhaka.edu addresses are accepted</span>
            </div>

            {/* Student ID */}
            <div className="form-group">
              <label className="label">Student ID</label>
              <div className="input-wrapper">
                <Hash className="input-icon" size={20} />
                <input
                  type="text"
                  name="studentId"
                  className="input"
                  placeholder="e.g. 210041234"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Age & Hall */}
            <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="label">Age</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <input
                    type="number"
                    name="age"
                    className="input"
                    placeholder="21"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group" style={{ flex: 2 }}>
                <label className="label">Hall of Residence</label>
                <div className="input-wrapper">
                  <Building className="input-icon" size={20} />
                  <input
                    type="text"
                    name="hall"
                    className="input"
                    placeholder="e.g. New Hall/Utility"
                    value={formData.hall}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
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
            <Link to="/login" className="text-violet">Login here</Link>
          </p>
          <p className="auth-footer secondary">
            <Link to="/" className="text-violet">← Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;