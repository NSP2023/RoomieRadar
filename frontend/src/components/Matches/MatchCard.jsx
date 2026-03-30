import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, MapPin, Heart } from 'lucide-react'

const MatchCard = ({ match, index }) => {
  const navigate = useNavigate()

  const handleViewCompatibility = () => {
    navigate(`/results/${match.id}`)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    alert(`Liked ${match.name}!`)
  }

  const compatibilityColor = match.compatibility >= 90
    ? '#10b981'
    : match.compatibility >= 80
    ? '#f59e0b'
    : '#ef4444'

  const compatibilityText = match.compatibility >= 90
    ? 'Perfect Match!'
    : match.compatibility >= 80
    ? 'Great Match'
    : 'Good Match'

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-rank">
          #{index + 1}
        </div>
        <div className="match-score">
          <div className="score-circle" style={{ borderColor: compatibilityColor }}>
            {match.compatibility}
          </div>
          <span className="score-text">{compatibilityText}</span>
        </div>
      </div>

      <div className="match-profile">
        <div className="avatar-placeholder">
          <User size={40} />
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{match.name}</h3>
          <div className="profile-details">
            <div className="profile-age">
              {match.age} years old
            </div>
            <div className="profile-location">
              <MapPin size={14} />
              {match.location}
            </div>
          </div>
        </div>
      </div>

      <div className="match-personality">
        <div className="personality-badge">
          {match.personality}
        </div>
        <p className="personality-bio">{match.bio}</p>
      </div>

      <div className="match-preferences">
        <div className="preference">
          <span className="preference-label">Sleep:</span>
          <span className="preference-value">
            {match.preferences.sleep === 'early' ? '🌅 Early Bird' :
             match.preferences.sleep === 'night' ? '🦉 Night Owl' :
             '🌙 Midnight Riser'}
          </span>
        </div>
        <div className="preference">
          <span className="preference-label">Cleanliness:</span>
          <span className="preference-value">
            {match.preferences.cleanliness === 'meticulous' ? '✨ Meticulous' :
             match.preferences.cleanliness === 'balanced' ? '🏠 Balanced' :
             '😌 Relaxed'}
          </span>
        </div>
        <div className="preference">
          <span className="preference-label">Social:</span>
          <span className="preference-value">
            {match.preferences.social === 'introvert' ? '📚 Homebody' :
             match.preferences.social === 'balancedSocial' ? '⚖️ Balanced' :
             '🦋 Social Butterfly'}
          </span>
        </div>
      </div>

      <div className="match-actions">
        <button className="btn-action like" onClick={handleLike}>
          <Heart size={20} />
          Like
        </button>
        <button className="btn-action view-details" onClick={handleViewCompatibility}>
          View Compatibility
        </button>
      </div>

      <style jsx>{`
        .match-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .match-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .match-rank {
          font-size: 1.5rem;
          font-weight: 700;
          color: #e5e7eb;
        }

        .match-score {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .score-circle {
          width: 60px;
          height: 60px;
          border: 3px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .score-text {
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
        }

        .match-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .avatar-placeholder {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 1.3rem;
          margin-bottom: 4px;
          color: #1f2937;
        }

        .profile-details {
          display: flex;
          gap: 12px;
          align-items: center;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .profile-location {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .match-personality {
          margin-bottom: 20px;
        }

        .personality-badge {
          display: inline-block;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .personality-bio {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .match-preferences {
          background: #f9fafb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .preference {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .preference:last-child {
          margin-bottom: 0;
        }

        .preference-label {
          color: #6b7280;
        }

        .preference-value {
          color: #1f2937;
          font-weight: 500;
        }

        .match-actions {
          display: flex;
          gap: 12px;
        }

        .btn-action {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .like {
          background: white;
          color: #ef4444;
          border: 2px solid #fca5a5;
        }

        .like:hover {
          background: #fef2f2;
        }

        .view-details {
          background: #6366f1;
          color: white;
          border: none;
        }

        .view-details:hover {
          background: #4f46e5;
        }

        @media (max-width: 768px) {
          .match-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default MatchCard