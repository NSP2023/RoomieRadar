import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Frown } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <Frown size={100} />
          </div>

          <h1>404 - Page Not Found</h1>

          <p className="not-found-text">
            Oops! The page you're looking for seems to have wandered off.
            Maybe it's out finding the perfect roommate match!
          </p>

          <div className="not-found-suggestions">
            <p>Here are some helpful links instead:</p>

            <div className="suggestion-links">
              <Link to="/" className="suggestion-link">
                <Home size={20} />
                <span>Home Page</span>
              </Link>

              <Link to="/matches" className="suggestion-link">
                <Search size={20} />
                <span>Find Matches</span>
              </Link>

              <Link to="/questions" className="suggestion-link">
                <span>Compatibility Test</span>
              </Link>
            </div>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-large">
              Back to Home
            </Link>

            <button onClick={() => window.history.back()} className="btn btn-secondary">
              Go Back
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px 0;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .not-found-icon {
          margin-bottom: 40px;
          color: #6366f1;
          opacity: 0.8;
        }

        .not-found-content h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .not-found-text {
          font-size: 1.2rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .not-found-suggestions {
          background: #f9fafb;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 40px;
        }

        .not-found-suggestions p {
          color: #6b7280;
          margin-bottom: 20px;
        }

        .suggestion-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .suggestion-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: white;
          border-radius: 12px;
          text-decoration: none;
          color: #6366f1;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .suggestion-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          background: #6366f1;
          color: white;
        }

        .not-found-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .not-found-content h1 {
            font-size: 2.5rem;
          }

          .not-found-actions {
            flex-direction: column;
          }

          .suggestion-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFoundPage