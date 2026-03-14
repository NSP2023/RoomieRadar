import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    bio: 'Software engineer who loves hiking, cooking, and quiet evenings with a good book.',
    preferences: {
      sleep: 'night',
      noise: 'moderate',
      cleanliness: 'balanced',
      temperature: 'justRight',
      social: 'balancedSocial'
    }
  })

  const handleSave = () => {
    setIsEditing(false)
    alert('Profile saved successfully!')
  }

  const handleUpdatePreferences = () => {
    navigate('/questions')
  }

  const preferenceLabels = {
    sleep: {
      early: '🌅 Early Bird',
      night: '🦉 Night Owl',
      midnight: '🌙 Midnight Riser'
    },
    noise: {
      sensitive: '🔇 Sensitive',
      moderate: '🔉 Moderate',
      easy: '🔊 Easy-going'
    },
    cleanliness: {
      meticulous: '✨ Meticulous',
      balanced: '🏠 Balanced',
      relaxed: '😌 Relaxed'
    },
    temperature: {
      cool: '❄️ Cool & Fresh',
      justRight: '🌡️ Just Right',
      warm: '🔥 Warm & Cozy'
    },
    social: {
      introvert: '📚 Homebody',
      balancedSocial: '⚖️ Balanced',
      social: '🦋 Social Butterfly'
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1>Your Profile</h1>
          <p className="page-subtitle">Manage your preferences and personal information</p>
        </div>

        <div className="profile-content">
          <div className="profile-card card">
            <div className="profile-header">
              <div className="profile-avatar">
                <User size={60} />
              </div>

              <div className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <h2>{profile.name}</h2>
                )}

                <div className="profile-actions">
                  {isEditing ? (
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save size={20} />
                      Save Changes
                    </button>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                      <Edit2 size={20} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <Mail size={20} />
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>

              <div className="detail-item">
                <Phone size={20} />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>

              <div className="detail-item">
                <MapPin size={20} />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>

            <div className="profile-bio">
              <h3>About Me</h3>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="edit-textarea"
                  rows="4"
                />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="preferences-card card">
            <div className="preferences-header">
              <h2>My Preferences</h2>
              <p className="subtitle">Your lifestyle preferences for roommate matching</p>
            </div>

            <div className="preferences-grid">
              {Object.entries(profile.preferences).map(([key, value]) => (
                <div key={key} className="preference-item">
                  <div className="preference-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </div>
                  <div className="preference-value">
                    {preferenceLabels[key]?.[value] || value}
                  </div>
                </div>
              ))}
            </div>

            <div className="preferences-actions">
              <button onClick={handleUpdatePreferences} className="btn btn-primary">
                Update Preferences
              </button>
            </div>
          </div>

          <div className="stats-card card">
            <h2>Your Stats</h2>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">24</div>
                <div className="stat-label">Matches Viewed</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Compatibility Tests</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">92%</div>
                <div className="stat-label">Average Match Score</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">15</div>
                <div className="stat-label">Days on RoomieRadar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          padding: 40px 0 80px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 1.2rem;
        }

        .profile-content {
          display: grid;
          gap: 30px;
        }

        .profile-card {
          padding: 40px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .profile-info {
          flex: 1;
        }

        .profile-info h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #6b7280;
        }

        .detail-item span {
          color: #1f2937;
        }

        .profile-bio h3 {
          margin-bottom: 16px;
          font-size: 1.3rem;
        }

        .profile-bio p {
          color: #6b7280;
          line-height: 1.6;
        }

        .preferences-card {
          padding: 40px;
        }

        .preferences-header {
          margin-bottom: 40px;
        }

        .preferences-header h2 {
          margin-bottom: 8px;
        }

        .subtitle {
          color: #6b7280;
        }

        .preferences-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .preference-item {
          padding: 20px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .preference-label {
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: capitalize;
        }

        .preference-value {
          font-size: 1.1rem;
          color: #1f2937;
          font-weight: 500;
        }

        .preferences-actions {
          text-align: center;
        }

        .stats-card {
          padding: 40px;
        }

        .stats-card h2 {
          margin-bottom: 40px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 24px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .edit-input {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          color: #1f2937;
          transition: all 0.3s ease;
        }

        .edit-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .edit-textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          color: #1f2937;
          font-family: inherit;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .edit-textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .preferences-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-avatar {
            width: 100px;
            height: 100px;
          }

          .profile-info h2 {
            font-size: 1.8rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .profile-card,
          .preferences-card,
          .stats-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default ProfilePage