import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">RoomieRadar</span>
            </div>
            <p className="tagline">
              Find your perfect roommate match — cozy, easy, and fun!
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">💼</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <Link to="/">Features</Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/questions">Compatibility Test</Link>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press</Link>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 RoomieRadar. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 60px 0 30px;
          margin-top: auto;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 50px;
          margin-bottom: 40px;
        }
        
        .footer-section .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.8rem;
          font-weight: 700;
          color: #ff6b9d; /* Changed from #6366f1 (blue) to #ff6b9d (pink) */
          margin-bottom: 15px;
        }

        .tagline {
          color: #6b7280;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #6b7280;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: #ff6b9d; /* Changed from #6366f1 to #ff6b9d */
          color: white;
          transform: translateY(-3px);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .footer-column h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #1f2937;
        }

        .footer-column a {
          display: block;
          color: #6b7280;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }

        .footer-column a:hover {
          color: #ff6b9d; /* Changed from #6366f1 to #ff6b9d */
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #ff6b9d; /* Changed from #6366f1 to #ff6b9d */
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer