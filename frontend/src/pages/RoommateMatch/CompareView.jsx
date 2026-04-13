// src/pages/RoommateMatch/CompareView.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompareView.css';

const API_BASE_URL = 'http://localhost:5000/api';

const CompareView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: 'You',
    avatar:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=User&backgroundColor=b6e3f4',
    answers: {},
  });

  const normalizeValue = (value) => {
    if (!value) return null;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  // 🔢 Score helper — returns 1–5
  const getScore = (category, value) => {
    if (!value) return 3;

    value = normalizeValue(value);

    if (category === 'sleep') {
      if (value === 'Early') return 2;
      if (value === 'Late') return 4;
      return 3; // Flexible
    }

    if (value === 'High') return 5;
    if (value === 'Medium') return 3;
    if (value === 'Low') return 1;

    // guests / sharing / conflict / pets enum values
    if (value === 'Often' || value === 'Shared' || value === 'Immediate' || value === 'Yes') return 5;
    if (value === 'Sometimes' || value === 'Flexible' || value === 'Calm' || value === 'Maybe') return 3;
    if (value === 'Rarely' || value === 'Private' || value === 'Avoidant' || value === 'No') return 1;

    return 3;
  };

  const getAnswerText = (category, value) => {
    if (!value) return 'Not specified';

    value = normalizeValue(value);

    const mappings = {
      cleanliness: {
        High: 'Very Clean',
        Medium: 'Moderately Clean',
        Low: 'Relaxed about Cleanliness',
      },
      sleep: {
        Early: 'Early Riser',
        Flexible: 'Flexible Schedule',
        Late: 'Night Owl',
      },
      noise: {
        High: 'Loves Noise / Social',
        Medium: 'Moderate Noise Tolerance',
        Low: 'Prefers Quiet',
      },
      guests: {
        Often: 'Often has Guests',
        Sometimes: 'Occasional Guests',
        Rarely: 'Rarely has Guests',
      },
      sharing: {
        Shared: 'Very Open to Sharing',
        Flexible: 'Moderate Sharing',
        Private: 'Prefers Personal Items',
      },
      conflict: {
        Immediate: 'Direct & Open',
        Calm: 'Balanced Approach',
        Avoidant: 'Avoids Confrontation',
      },
      pets: {
        Yes: 'Loves Pets / Has Pets',
        Maybe: 'Okay with Pets',
        Flexible: 'Open to Pets',
        No: 'Prefers No Pets',
      },
    };

    return mappings[category]?.[value] || value;
  };

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
          setError('Please log in to view comparison');
          setLoading(false);
          return;
        }

        const profileRes = await axios.get(
          `${API_BASE_URL}/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = profileRes.data.user || {};
        const lifestyle = user.lifestyle || {};

        const userAnswers = {
          cleanliness: {
            score: getScore('cleanliness', lifestyle.cleanliness),
            text: getAnswerText('cleanliness', lifestyle.cleanliness),
          },
          sleep: {
            score: getScore('sleep', lifestyle.sleep),
            text: getAnswerText('sleep', lifestyle.sleep),
          },
          noise: {
            score: getScore('noise', lifestyle.noiseTolerance || lifestyle.noise),
            text: getAnswerText('noise', lifestyle.noiseTolerance || lifestyle.noise),
          },
          guests: {
            score: getScore('guests', lifestyle.guests),
            text: getAnswerText('guests', lifestyle.guests),
          },
          sharing: {
            score: getScore('sharing', lifestyle.sharing),
            text: getAnswerText('sharing', lifestyle.sharing),
          },
          conflict: {
            score: getScore('conflict', lifestyle.conflict),
            text: getAnswerText('conflict', lifestyle.conflict),
          },
          pets: {
            score: getScore('pets', lifestyle.pets),
            text: getAnswerText('pets', lifestyle.pets),
          },
        };

        setCurrentUser({
          name: user.name || 'You',
          avatar:
            user.avatar ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name || 'User'}&backgroundColor=b6e3f4`,
          answers: userAnswers,
        });

        const compareRes = await axios.post(
          `${API_BASE_URL}/matches/compare`,
          { roommate1Id: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { comparison } = compareRes.data;
        const roommate = comparison.roommate1 || comparison.roommate2;

        if (!roommate) throw new Error('Match not found');

        const rLifestyle = roommate.lifestyle || {};

        const matchAnswers = {
          cleanliness: {
            score: getScore('cleanliness', rLifestyle.cleanliness),
            text: getAnswerText('cleanliness', rLifestyle.cleanliness),
          },
          sleep: {
            score: getScore('sleep', rLifestyle.sleep),
            text: getAnswerText('sleep', rLifestyle.sleep),
          },
          noise: {
            score: getScore('noise', rLifestyle.noiseTolerance || rLifestyle.noise),
            text: getAnswerText('noise', rLifestyle.noiseTolerance || rLifestyle.noise),
          },
          guests: {
            score: getScore('guests', rLifestyle.guests),
            text: getAnswerText('guests', rLifestyle.guests),
          },
          sharing: {
            score: getScore('sharing', rLifestyle.sharing),
            text: getAnswerText('sharing', rLifestyle.sharing),
          },
          conflict: {
            score: getScore('conflict', rLifestyle.conflict),
            text: getAnswerText('conflict', rLifestyle.conflict),
          },
          pets: {
            score: getScore('pets', rLifestyle.pets),
            text: getAnswerText('pets', rLifestyle.pets),
          },
        };

        setMatchData({
          name: roommate.name || 'Roomie',
          age: roommate.age || '?',
          hall: roommate.university || roommate.hall || '—',
          whatsapp: roommate.whatsapp || null,
          avatar:
            roommate.avatar ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${roommate.name || id}&backgroundColor=fed7aa`,
          answers: matchAnswers,
          compatibilityScore: Math.round(roommate.compatibilityScore || 70),
        });

        setLoading(false);
      } catch (err) {
        console.error('Comparison error:', err);
        setError(
          err.response?.status === 401
            ? 'Session expired. Please log in again.'
            : 'Could not load comparison.'
        );
        setLoading(false);
      }
    };

    fetchCompareData();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy'));
  };

  const categories = [
    { label: 'Cleanliness', key: 'cleanliness' },
    { label: 'Sleep Schedule', key: 'sleep' },
    { label: 'Noise Tolerance', key: 'noise' },
    { label: 'Guests / Social Life', key: 'guests' },
    { label: 'Sharing Food & Items', key: 'sharing' },
    { label: 'Conflict Resolution', key: 'conflict' },
    { label: 'Pet Compatibility', key: 'pets' },
  ];

  const compatibilityScore = matchData?.compatibilityScore || 0;

  if (loading) {
    return (
      <div className="compare-page">
        <div className="container">
          <h1 className="page-title">Loading comparison...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-page">
        <div className="container">
          <h1 className="page-title">Error</h1>
          <p>{error}</p>
          <button className="back-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <div className="container">
        <h1 className="page-title">Side-by-Side Comparison</h1>

        <p className="subtitle">
          You vs {matchData?.name} — let's see how you match
        </p>

        <div className="comparison-grid">
          {/* YOU */}
          <div className="profile-column you-column">
            <div className="column-title">YOU</div>

            <div className="avatar-container">
              <img src={currentUser.avatar} alt="Your avatar" className="avatar" />
            </div>

            <div className="name">{currentUser.name}</div>

            <div className="details-list">
              {categories.map((cat) => (
                <div key={cat.key} className="detail-item">
                  <span className="detail-label">{cat.label}</span>
                  <span className="detail-value">
                    {currentUser.answers[cat.key]?.score || 3} / 5
                    <br />
                    <small className="answer-text">
                      {currentUser.answers[cat.key]?.text || 'Not specified'}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MATCH */}
          <div className="profile-column match-column">
            <div className="column-title">{matchData.name}</div>

            <div className="avatar-container">
              <img src={matchData.avatar} alt="match avatar" className="avatar" />
            </div>

            <div className="name">{matchData.name}</div>

            <div className="user-info-line">
              Age: <strong>{matchData.age}</strong> | Hall:{' '}
              <strong>{matchData.hall}</strong>
            </div>

            <div
              className={`score-big ${
                compatibilityScore >= 80
                  ? 'high'
                  : compatibilityScore >= 65
                  ? 'medium'
                  : 'low'
              }`}
            >
              {compatibilityScore}%
            </div>

            <div className="details-list">
              {categories.map((cat) => (
                <div key={cat.key} className="detail-item">
                  <span className="detail-label">{cat.label}</span>
                  <span className="detail-value">
                    {matchData.answers[cat.key]?.score || '?'} / 5
                    <br />
                    <small className="answer-text">
                      {matchData.answers[cat.key]?.text || 'Not specified'}
                    </small>
                  </span>
                </div>
              ))}
            </div>

            {matchData.whatsapp && (
              <div className="contact-section">
                <button
                  className="contact-btn"
                  onClick={() => setShowContact(!showContact)}
                >
                  Contact {matchData.name} ♡
                </button>

                {showContact && (
                  <div className="contact-info-popup">
                    <div className="contact-row">
                      <span className="contact-label">WhatsApp:</span>
                      <a
                        href={`https://wa.me/${matchData.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-value whatsapp"
                      >
                        {matchData.whatsapp}
                      </a>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(matchData.whatsapp)}
                      >
                        📋
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate('/matches')}>
          ← Back to Matches
        </button>
      </div>
    </div>
  );
};

export default CompareView;