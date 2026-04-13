import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { matches, defaultUserPreferences } from '../data'
import CompatibilityChart from '../components/Matches/CompatibilityChart'
import DayVisualization from '../components/Matches/DayVisualization'
import { ArrowLeft, Home, Users, RefreshCw } from 'lucide-react'

const ResultsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const match = matches.find(m => m.id === parseInt(id))

  // In a real app, you'd get this from user profile or localStorage
  const userPreferences = {
    sleep: 'early',
    noise: 'moderate',
    cleanliness: 'relaxed',
    temperature: 'warm',
    social: 'social'
  }

  if (!match) {
    return (
      <div className="not-found">
        <h2>Match not found</h2>
        <button onClick={() => navigate('/matches')} className="btn btn-primary">
          Back to Matches
        </button>
      </div>
    )
  }

  const handleBackToMatches = () => {
    navigate('/matches')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleCompareAnother = () => {
    navigate('/matches')
  }

  const handleAdjustAnswers = () => {
    navigate('/questions')
  }

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header">
          <button
            onClick={handleBackToMatches}
            className="btn-back"
          >
            <ArrowLeft size={20} />
            Back to Matches
          </button>

          <div className="header-content">
            <div className="match-intro">
              <h1>Perfect Match!</h1>
              <p className="match-subtitle">Compatibility Score: {match.compatibility}%</p>
            </div>

            <div className="personality-match">
              <div className="personality-item">
                <span className="personality-label">You are a</span>
                <span className="personality-type">Morning Socialite</span>
              </div>
              <div className="personality-divider">+</div>
              <div className="personality-item">
                <span className="personality-label">Your roommate is a</span>
                <span className="personality-type">{match.personality}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="results-content">
          <div className="results-section">
            <CompatibilityChart
              userPreferences={userPreferences}
              matchPreferences={match.preferences}
            />
          </div>

          <div className="results-section">
            <DayVisualization
              userSchedule={{
                '7:00 AM': 'active',
                '9:00 AM': 'busy',
                '12:00 PM': 'active',
                '3:00 PM': 'busy',
                '6:00 PM': 'socializing',
                '9:00 PM': 'relaxing',
                '10:00 PM': 'sleeping',
                '12:00 AM': 'sleeping'
              }}
              matchSchedule={{
                '7:00 AM': 'active',
                '9:00 AM': 'busy',
                '12:00 PM': 'active',
                '3:00 PM': 'busy',
                '6:00 PM': 'socializing',
                '9:00 PM': 'relaxing',
                '10:00 PM': 'sleeping',
                '12:00 AM': 'sleeping'
              }}
            />
          </div>

          <div className="results-section">
            <div className="tips-section card">
              <h3>Tips for Living Together</h3>

              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">🤝</div>
                  <h4>Find Common Ground</h4>
                  <p>Share a meal, watch a movie together, or plan a shared activity weekly.</p>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">⚖️</div>
                  <h4>Be Flexible</h4>
                  <p>Small compromises from both sides can create a harmonious living situation.</p>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">🗣️</div>
                  <h4>Communicate Openly</h4>
                  <p>Discuss expectations early and check in regularly about how things are going.</p>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">🏠</div>
                  <h4>Respect Space</h4>
                  <p>Balance social time with personal space to maintain a healthy dynamic.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleBackToMatches} className="btn btn-secondary">
              <Users size={20} />
              Back to Matches
            </button>

            <button onClick={handleBackToHome} className="btn btn-secondary">
              <Home size={20} />
              Back to Home
            </button>

            <button onClick={handleCompareAnother} className="btn btn-secondary">
              <RefreshCw size={20} />
              Compare Another
            </button>

            <button onClick={handleAdjustAnswers} className="btn btn-primary">
              Adjust My Answers
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .results-page {
          padding: 40px 0 80px;
        }

        .results-header {
          margin-bottom: 60px;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #6b7280;
          font-size: 1rem;
          cursor: pointer;
          padding: 8px 0;
          margin-bottom: 30px;
          transition: color 0.3s ease;
        }

        .btn-back:hover {
          color: #6366f1;
        }

        .header-content {
          text-align: center;
        }

        .match-intro h1 {
          font-size: 3rem;
          margin-bottom: 8px;
        }

        .match-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          margin-bottom: 30px;
        }

        .personality-match {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .personality-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .personality-label {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .personality-type {
          font-size: 1.5rem;
          font-weight: 700;
          color: #6366f1;
          padding: 12px 24px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 12px;
        }

        .personality-divider {
          font-size: 2rem;
          color: #6366f1;
          font-weight: 700;
        }

        .results-content {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .results-section {
          width: 100%;
        }

        .tips-section {
          padding: 40px;
        }

        .tips-section h3 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 1.8rem;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .tip-card {
          text-align: center;
          padding: 30px;
          background: #f9fafb;
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tip-card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .tip-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .tip-card h4 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .tip-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .action-buttons .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .match-intro h1 {
            font-size: 2.5rem;
          }

          .personality-match {
            flex-direction: column;
            gap: 20px;
          }

          .personality-divider {
            transform: rotate(90deg);
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }

          .tips-section {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default ResultsPage