import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, User } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleGetStarted = () => {
    navigate('/questions')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  // Show "Back to Home" only on profile page
  const showBackToHome = location.pathname === '/profile'

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/'

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏠</span>
          </Link>

          <div className="nav-right-section">
            {/* Show "Back to Home" button only on profile page */}
            {showBackToHome ? (
              <button
                className="nav-link back-to-home"
                onClick={handleBackToHome}
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </button>
            ) : (
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                <User size={20} />
                <span>Profile</span>
              </Link>
            )}

            {/* Show Get Started button only on homepage */}
            {isHomePage && (
              <button className="btn btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.3s ease;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-right-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #6b7280;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #ff6b9d;
        }

        .back-to-home {
          color: #6b7280;
        }

        .back-to-home:hover {
          color: #ff6b9d;
          background: rgba(255, 107, 157, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b9d, #ff8fab);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 107, 157, 0.3);
        }

        @media (max-width: 768px) {
          .nav-right-section {
            gap: 15px;
          }

          .nav-link span {
            display: none;
          }

          .nav-link {
            padding: 8px;
          }

          .btn-primary {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .back-to-home span {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar