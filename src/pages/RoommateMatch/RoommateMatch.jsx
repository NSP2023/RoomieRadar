// src/pages/RoommateMatch/RoommateMatch.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoommateMatch.css';

const API_BASE_URL = 'http://localhost:5000/api'; // ← change if backend port/host is different

const RoommateMatch = () => {
  const navigate = useNavigate();
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch top matches from backend
  const fetchMatches = async () => {
    try {
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to see your matches');
        return;
      }

      const matchesRes = await axios.get(`${API_BASE_URL}/matches/top`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const topMatches = matchesRes.data.topMatches || [];

      // Transform backend data to match frontend card format
      const formattedRoommates = topMatches.map((match) => {
        const roommate = match.roommate;

        return {
          id: roommate._id,
          name: roommate.name || 'Roomie',
          compatibility: Math.round(match.compatibilityScore || 0),
          top: match.badges?.includes('Top Match') || match.compatibilityScore >= 80,
        };
      });

      setRoommates(formattedRoommates);
    } catch (err) {
      console.error('Error fetching matches:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Could not load matches. Please try again.');
      }
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMatches();
      setLoading(false);
    };

    loadData();
  }, []);

  // Manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMatches();
    setRefreshing(false);
  };

  const handleViewSimulation = (id) => {
    navigate(`/simulation/${id}`);
  };

  const handleCompare = (id) => {
    navigate(`/compare/${id}`);
  };

  if (loading) {
    return (
      <div className="matches-page">
        <div className="container">
          <h1 className="page-title">Your Roomie Matches</h1>
          <p className="subtitle">Loading your best matches... ♡</p>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p>Just a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-page">
        <div className="container">
          <h1 className="page-title">Your Roomie Matches</h1>
          <p className="subtitle">Here are the cutest matches for you~ ♡</p>
          <div
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              color: '#e74c3c',
            }}
          >
            <p>{error}</p>
            <button
              className="action-btn view-simulation-btn"
              onClick={handleRefresh}
              style={{ marginTop: '1.5rem' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="matches-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Your Roomie Matches</h1>
          <button
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh matches"
          >
            {refreshing ? 'Refreshing...' : 'Refresh Matches'}
          </button>
        </div>

        <p className="subtitle">Here are the cutest matches for you~ ♡</p>

        {roommates.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p>No matches found yet... 🥺</p>
            <p>Try updating your preferences or refresh!</p>
          </div>
        ) : (
          <div className="matches-grid">
            {roommates.map((rm) => (
              <div
                key={rm.id}
                className={`match-card ${rm.top ? 'top-match' : ''}`}
              >
                {rm.top && <div className="top-badge">Top Match! ★</div>}

                <div className="card-name">{rm.name}</div>

                <div className="compatibility-score">{rm.compatibility}%</div>
                <div className="score-label">Compatibility Score</div>

                <div className="button-group">
                  <button
                    className="action-btn view-simulation-btn"
                    onClick={() => handleViewSimulation(rm.id)}
                  >
                    View Day Simulation
                  </button>

                  <button
                    className="action-btn compare-btn"
                    onClick={() => handleCompare(rm.id)}
                  >
                    Compare ✧
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateMatch;