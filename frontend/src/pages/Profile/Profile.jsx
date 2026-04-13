// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { questionnaireQuestions } from '../../data/questionnaireQuestions';
import './Profile.css';

const API_BASE_URL = 'http://localhost:5000/api';

const HALL_OPTIONS = [
  'North Hall (Male)',
  'South Hall (Male)',
  'East Hall (Male)',
  'Utility Building (Male)',
  'Utility Building (Female)',
  'EE Bungalow (Female)',
  'EW Bungalow (Female)',
  'New Hall (Female)',
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [error, setError] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const questions = questionnaireQuestions;

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    university: '',
    department: '',
    year: '',
    hall: '',
    age: '',
    bio: '',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=User&backgroundColor=b6e3f4',
  });

  const [answers, setAnswers] = useState({});
  const [originalAnswers, setOriginalAnswers] = useState({});

  // Staggered reveal
  useEffect(() => {
    if (visibleQuestions < questions.length) {
      const timer = setTimeout(() => setVisibleQuestions((p) => p + 1), 120);
      return () => clearTimeout(timer);
    }
  }, [visibleQuestions, questions.length]);

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) { setError('Please log in'); setLoading(false); return; }

        const res = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user || {};
        const lifestyle = user.lifestyle || {};

        setProfile({
          name:       user.name       || '',
          email:      user.email      || '',
          university: user.university || '',
          department: user.department || '',   
          year:       user.year       || '',   
          hall:       user.hall       || '',   
          age:        user.age        || '',   
          bio:        user.bio        || '',
          avatar:
            user.avatar ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name || 'User'}&backgroundColor=b6e3f4`,
        });

        // Map backend enums → questionnaire numeric scores
        // Map backend enum strings → new 1–5 scores
const mapped = {
  cleanliness:
    lifestyle.cleanliness === 'High'   ? 5 :
    lifestyle.cleanliness === 'Medium' ? 4 :
    lifestyle.cleanliness === 'Low'    ? 3 : null,

  sleep:
    lifestyle.sleep === 'Early'    ? 5 :
    lifestyle.sleep === 'Flexible' ? 4 :
    lifestyle.sleep === 'Late'     ? 3 : null,

  noise:
    lifestyle.noiseTolerance === 'High'   ? 5 :
    lifestyle.noiseTolerance === 'Medium' ? 4 :
    lifestyle.noiseTolerance === 'Low'    ? 3 : null,

  guests:
    lifestyle.guests === 'Often'     ? 5 :
    lifestyle.guests === 'Sometimes' ? 4 :
    lifestyle.guests === 'Rarely'    ? 3 : null,

  sharing:
    lifestyle.sharing === 'Shared'   ? 5 :
    lifestyle.sharing === 'Flexible' ? 4 :
    lifestyle.sharing === 'Private'  ? 3 : null,

  conflict:
    lifestyle.conflict === 'Immediate' ? 5 :
    lifestyle.conflict === 'Calm'      ? 4 :
    lifestyle.conflict === 'Avoidant'  ? 3 : null,

  petsAttitude:
    lifestyle.pets === 'Yes'      ? 5 :
    lifestyle.pets === 'Flexible' ? 4 :
    lifestyle.pets === 'Maybe'    ? 3 :
    lifestyle.pets === 'No'       ? 1 : null,

  petsResponsibility: null,
};

        setAnswers(mapped);
        setOriginalAnswers(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await axios.post(`${API_BASE_URL}/users/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile((prev) => ({ ...prev, avatar: res.data.avatar }));
      setSaveMessage('Profile picture updated! ♡');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  const handleAnswer = (field, score) => {
    if (!isEditing) return;
    setAnswers((prev) => ({ ...prev, [field]: score }));
    setSaveMessage(null);
  };

  const hasChanges = JSON.stringify(answers) !== JSON.stringify(originalAnswers);

  const scoreToLifestyle = (a) => ({
  cleanliness:
    a.cleanliness >= 5 ? 'High' : a.cleanliness >= 4 ? 'Medium' : 'Low',
  sleep:
    a.sleep >= 5 ? 'Early' : a.sleep >= 4 ? 'Flexible' : 'Late',
  noiseTolerance:
    a.noise >= 5 ? 'High' : a.noise >= 4 ? 'Medium' : 'Low',
  guests:
    a.guests >= 5 ? 'Often' : a.guests >= 4 ? 'Sometimes' : 'Rarely',
  sharing:
    a.sharing >= 5 ? 'Shared' : a.sharing >= 4 ? 'Flexible' : 'Private',
  conflict:
    a.conflict >= 5 ? 'Immediate' : a.conflict >= 4 ? 'Calm' : 'Avoidant',
  pets:
    a.petsAttitude >= 5 ? 'Yes' :
    a.petsAttitude >= 4 ? 'Flexible' :
    a.petsAttitude >= 3 ? 'Maybe' : 'No',
});
  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveMessage(null);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) { setError('Session expired.'); return; }

      const res = await axios.put(
        `${API_BASE_URL}/users/profile`,
        {
          name:       profile.name,
          bio:        profile.bio,
          department: profile.department,
          year:       profile.year,
          hall:       profile.hall,
          lifestyle:  scoreToLifestyle(answers),
          avatar:     profile.avatar,
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      if (res.status === 200) {
        setSaveMessage('Profile & preferences saved! ♡ Radar updated.');
        setOriginalAnswers({ ...answers });
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  if (loading) return (
    <div className="profile-page">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Loading your profile...</h2>
      </div>
    </div>
  );

  if (error) return (
    <div className="profile-page">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0', color: '#e74c3c' }}>
        <h2>{error}</h2>
        <button className="edit-btn" onClick={() => window.location.reload()} style={{ marginTop: '1.5rem' }}>
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">Your Profile ♡</h1>
        <p className="subtitle">This is how your future roomie will see you~</p>

        <div className="profile-card">

          {/* Avatar + Name */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img src={profile.avatar} alt="Your avatar" className="avatar-img" />
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    style={{ display: 'none' }}
                  />
                  <button
                    className="change-avatar-btn"
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading... ⏳' : 'Change Avatar ✏️'}
                  </button>
                </>
              )}
            </div>
            <div className="basic-info">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="edit-input name-input"
                  placeholder="Your name"
                />
              ) : (
                <h2 className="profile-name">{profile.name}</h2>
              )}
              <div className="profile-meta">
                <span>Age: {profile.age}</span>
                <span>•</span>
                <span>{profile.university}</span>
                <span>•</span>
                <span>{profile.hall || '—'}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bio-section">
            <h3 className="section-title">About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="bio-textarea"
                rows={4}
                placeholder="Tell future roomies about yourself!"
              />
            ) : (
              <p className="bio-text">{profile.bio}</p>
            )}
          </div>

          {/* Personal Info */}
          <div className="personal-details">
            <h3 className="section-title">Personal Info</h3>
            <div className="info-grid">

              {/* Email — read only always */}
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{profile.email}</div>
              </div>

              {/* Age — from backend, read only */}
              <div className="info-item">
                <div className="info-label">Age</div>
                <div className="info-value">{profile.age || '—'}</div>
              </div>

              {/* Department — from backend, editable */}
              <div className="info-item">
                <div className="info-label">Department</div>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                ) : (
                  <div className="info-value">{profile.department || '—'}</div>
                )}
              </div>

              {/* Year — from backend, editable */}
              <div className="info-item">
                <div className="info-label">Year</div>
                {isEditing ? (
                  <input
                    type="text"
                    name="year"
                    value={profile.year}
                    onChange={handleChange}
                    className="edit-input"
                    placeholder="e.g. 3rd Year"
                  />
                ) : (
                  <div className="info-value">{profile.year || '—'}</div>
                )}
              </div>

              {/* Hall — from backend, editable dropdown */}
              <div className="info-item">
                <div className="info-label">Hall / Residence</div>
                {isEditing ? (
                  <select
                    name="hall"
                    value={profile.hall}
                    onChange={handleChange}
                    className="edit-input pref-select"
                  >
                    <option value="">— Select your hall —</option>
                    {HALL_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                ) : (
                  <div className="info-value">{profile.hall || '—'}</div>
                )}
              </div>

            </div>
          </div>

          {/* Your Answers & Preferences */}
          <div className="preferences-section">
            <h3 className="section-title">Your Answers & Preferences</h3>
            <p className="subtitle" style={{ textAlign: 'left', fontSize: '1rem', marginBottom: '1.5rem' }}>
              {isEditing
                ? 'Click an option to update your lifestyle answers ♡'
                : 'Click "Edit Profile" to change your answers~'}
            </p>

            <div className="questions-grid">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`question-item ${index < visibleQuestions ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <h3 className="question-text">{q.question}</h3>
                  <div className="options">
                    {q.options.map((opt, idx) => {
                      const isSelected = answers[q.field] === opt.score;
                      return (
                        <button
                          key={idx}
                          className={`option ${isSelected ? 'selected' : ''} ${!isEditing ? 'readonly' : ''}`}
                          onClick={() => handleAnswer(q.field, opt.score)}
                          disabled={!isEditing}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  <div className="score-display">
                    Your vibe: <strong>{answers[q.field] != null ? answers[q.field] : '—'}</strong> / 10
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save message */}
          {saveMessage && (
            <p className="save-message fade-in" style={{ textAlign: 'center', color: '#4caf50', margin: '1rem 0' }}>
              {saveMessage}
            </p>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            {isEditing ? (
              <>
                <button
                  className={`save-btn ${hasChanges ? '' : 'disabled'}`}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save My Changes ♡'}
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;