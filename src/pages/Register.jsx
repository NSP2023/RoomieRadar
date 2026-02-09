import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app main-content">
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>
      <div className="floating-heart heart-3">💚</div>
      <div className="floating-heart heart-4">💖</div>

      <div className="container auth-container">
        <motion.div 
          className="card auth-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="auth-header">
            <span className="logo-icon">✨</span>
            <h2 className="text-gradient">Create Account</h2>
            <p>Join the community and find your tribe!</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="label">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Alex Morgan"
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  className="input" 
                  placeholder="alex@example.com"
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
                  placeholder="Min. 6 characters"
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
              {loading ? 'Creating Account...' : 'Get Started!'} <UserPlus size={20} />
            </button>
          </form>

          <div className="divider"></div>

          <p className="auth-footer">
            Already a member? <Link to="/login" className="text-violet">Login here</Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0;
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          border-radius: var(--radius-xl);
        }
        .auth-header { text-align: center; margin-bottom: var(--space-xl); }
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
        .text-violet { color: var(--secondary-color); text-decoration: none; }
        .text-violet:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default Register;