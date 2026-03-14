import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  const navigate = useNavigate()

  const handleCheckCompatibility = () => {
    navigate('/questions')
  }

  const handleViewMatches = () => {
    navigate('/matches')
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>RoomieRadar</h1>
            <p className="subtitle">
              Find your perfect roommate match — cozy, easy, and fun!
            </p>
            <p className="description">
              Answer a few friendly questions about your lifestyle, and we'll show you
              how well you and your potential roommate align. No stress, just insights!
            </p>
            <div className="hero-buttons">
              <button onClick={handleCheckCompatibility} className="btn btn-primary btn-large">
                Check Compatibility
              </button>
              <button onClick={handleViewMatches} className="btn btn-secondary btn-large">
                View Matches
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card card">
              <div className="compatibility-circle">
                <div className="score">95%</div>
                <div className="label">Match Score</div>
              </div>
              <div className="compatibility-details">
                <div className="detail-item">
                  <span className="label">Sleep</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="label">Cleanliness</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="label">Social</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          padding: 80px 0;
          position: relative;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .subtitle {
          font-size: 1.8rem;
          color: #1f2937;
          margin: 20px 0;
          font-weight: 600;
        }

        .description {
          font-size: 1.1rem;
          color: #6b7280;
          margin-bottom: 30px;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-top: 30px;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .floating-card {
          width: 320px;
          padding: 30px;
          text-align: center;
          animation: float 6s ease-in-out infinite;
        }

        .compatibility-circle {
          width: 150px;
          height: 150px;
          margin: 0 auto 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            background: linear-gradient(135deg, #ff6b9d 0%, #9d4edd 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .score {
          font-size: 2.5rem;
          font-weight: 700;
        }

        .label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .compatibility-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .detail-item {
          text-align: left;
        }

        .detail-item .label {
          display: block;
          margin-bottom: 5px;
          color: #1f2937;
          font-weight: 500;
        }

        .progress-bar {
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b9d, #9d4edd);
          border-radius: 4px;
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .hero-buttons {
            flex-direction: column;
          }

          .floating-card {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero