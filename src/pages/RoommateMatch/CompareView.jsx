// src/pages/CompareView/CompareView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompareView.css';

const API_BASE_URL = 'http://localhost:5000/api'; // Change if your backend runs on different port/host

const CompareView = () => {
  const { id } = useParams(); // This is the roommate's user ID
  const navigate = useNavigate();

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);

  // Current logged-in user (fetched from backend)
  const [currentUser, setCurrentUser] = useState({
    name: 'You',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=User&backgroundColor=b6e3f4',
    answers: {},
  });

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

        // 1. Fetch current user's profile (lifestyle answers)
        const profileRes = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = profileRes.data;
        const userLifestyle = user.lifestyle || {};

        // Map backend lifestyle fields to frontend-friendly answers
        // Adjust mapping according to your actual questionnaire fields
        const userAnswers = {
          cleanliness: {
            score: userLifestyle.cleanliness === 'High' ? 9 : userLifestyle.cleanliness === 'Low' ? 3 : 6,
            text: userLifestyle.cleanliness || 'Medium',
          },
          sleep: {
            score: userLifestyle.sleep === 'Early' ? 3 : userLifestyle.sleep === 'Late' ? 8 : 6,
            text: userLifestyle.sleep || 'Flexible',
          },
          noise: {
            score: userLifestyle.noiseTolerance === 'High' ? 9 : userLifestyle.noiseTolerance === 'Low' ? 3 : 7,
            text: userLifestyle.noiseTolerance || 'Medium',
          },
          // Add more fields when you expand categories (guests, sharing, conflict, pets)
          guests: { score: 5, text: '—' },
          sharing: { score: 5, text: '—' },
          conflict: { score: 5, text: '—' },
          pets: { score: 5, text: '—' },
        };

        setCurrentUser({
          name: user.name || 'You',
          avatar: user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name || 'User'}&backgroundColor=b6e3f4`,
          answers: userAnswers,
        });

        // 2. Fetch comparison data from backend
        const compareRes = await axios.post(
          `${API_BASE_URL}/matches/compare`,
          { roommate1Id: id, roommate2Id: id }, // For now we compare only with one roommate
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { comparison } = compareRes.data;

        // Use only the first roommate for this view
        const roommate = comparison.roommate1 || comparison.roommate2;

        if (!roommate) {
          throw new Error('Match not found');
        }

        const roommateLifestyle = roommate.lifestyle || {};

        const matchAnswers = {
          cleanliness: {
            score: roommateLifestyle.cleanliness === 'High' ? 9 : roommateLifestyle.cleanliness === 'Low' ? 3 : 6,
            text: roommateLifestyle.cleanliness || 'Medium',
          },
          sleep: {
            score: roommateLifestyle.sleep === 'Early' ? 3 : roommateLifestyle.sleep === 'Late' ? 8 : 6,
            text: roommateLifestyle.sleep || 'Flexible',
          },
          noise: {
            score: roommateLifestyle.noiseTolerance === 'High' ? 9 : roommateLifestyle.noiseTolerance === 'Low' ? 3 : 7,
            text: roommateLifestyle.noiseTolerance || 'Medium',
          },
          // Add more when expanded
          guests: { score: 5, text: '—' },
          sharing: { score: 5, text: '—' },
          conflict: { score: 5, text: '—' },
          pets: { score: 5, text: '—' },
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
        console.error('Error fetching comparison data:', err);
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Could not load comparison. Please try again.');
        }
        setLoading(false);
      }
    };

    fetchCompareData();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy:', err));
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
          <h1 className="page-title">Side-by-Side Comparison</h1>
          <p className="subtitle">Loading comparison...</p>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p>Preparing your view ♡</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-page">
        <div className="container">
          <h1 className="page-title">Side-by-Side Comparison</h1>
          <p className="subtitle">Error loading comparison</p>
          <div style={{ textAlign: 'center', marginTop: '4rem', color: '#e74c3c' }}>
            <p>{error}</p>
            <button className="back-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <div className="container">
        <h1 className="page-title">Side-by-Side Comparison</h1>
        <p className="subtitle">You vs {matchData.name} — let's see how you match~ ♡</p>

        <div className="comparison-grid">
          {/* Your Column */}
          <div className="profile-column you-column">
            <div className="column-title">YOU</div>

            <div className="avatar-container">
              <img src={currentUser.avatar} alt="Your avatar" className="avatar" />
            </div>

            <div className="name">{currentUser.name}</div>

            <div className="score-big">{currentUser.compatibility || 100}%</div>

            <div className="details-list">
              {categories.map((cat) => (
                <div key={cat.key} className="detail-item">
                  <span className="detail-label">{cat.label}</span>
                  <span className="detail-value">
                    {currentUser.answers[cat.key]?.score || '?'} / 10
                    <br />
                    <small className="answer-text">
                      {currentUser.answers[cat.key]?.text || '—'}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Match Column */}
          <div className="profile-column match-column">
            <div className="column-title">{matchData.name}</div>

            <div className="avatar-container">
              <img src={matchData.avatar} alt={`${matchData.name}'s avatar`} className="avatar" />
            </div>

            <div className="name">{matchData.name}</div>

            <div className="user-info-line">
              Age: <strong>{matchData.age}</strong> | Hall: <strong>{matchData.hall}</strong>
            </div>

            <div className={`score-big ${compatibilityScore >= 80 ? 'high' : compatibilityScore >= 65 ? 'medium' : 'low'}`}>
              {compatibilityScore}%
            </div>

            <div className="details-list">
              {categories.map((cat) => (
                <div key={cat.key} className="detail-item">
                  <span className="detail-label">{cat.label}</span>
                  <span className="detail-value">
                    {matchData.answers[cat.key]?.score || '?'} / 10
                    <br />
                    <small className="answer-text">
                      {matchData.answers[cat.key]?.text || '—'}
                    </small>
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Button */}
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
                        title="Copy WhatsApp number"
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