import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app main-content">
      {/* Background Decor from your CSS */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="floating-heart heart-1">❤️</div>
      <div className="floating-heart heart-2">💖</div>

      <div className="container auth-container">
        <motion.div 
          className="card auth-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <span className="logo-icon">🏠</span>
            <h2 className="text-gradient">Welcome Back</h2>
            <p>Ready to find your perfect roomie match?</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  className="input" 
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type="password" 
                  className="input" 
                  placeholder="••••••••"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-large w-full ${loading ? 'opacity-70' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login Now'} <LogIn size={20} />
            </button>
          </form>

          <div className="divider"></div>

          <p className="auth-footer">
            Don't have an account? <Link to="/register" className="text-pink">Create one here</Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 160px);
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          border-radius: var(--radius-xl);
        }
        .auth-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .logo-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; }
        .auth-form { display: flex; flex-direction: column; gap: var(--space-md); }
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        .input { padding-left: 45px; }
        .w-full { width: 100%; margin-top: 10px; }
        .auth-footer { text-align: center; font-weight: 500; }
        .text-pink { color: var(--primary-color); text-decoration: none; }
        .text-pink:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default Login;