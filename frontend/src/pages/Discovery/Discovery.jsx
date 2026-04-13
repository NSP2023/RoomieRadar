// src/pages/Discovery/Discovery.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import './Discovery.css';

const API_BASE_URL = 'http://localhost:5000/api'; 

const Discovery = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Fetch top matches from backend when component mounts
  useEffect(() => {
    const fetchTopMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
          setError('Please log in to discover roomies');
          setLoading(false);
          return;
        }

        // UPDATED: Backend identifies user via JWT token, so we call /matches/top directly
        const matchesRes = await axios.get(
          `${API_BASE_URL}/matches/top`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const topMatches = matchesRes.data.topMatches || [];

        // Transform backend data to frontend-friendly profile format
        const formattedProfiles = topMatches.map((match) => {
          const roommate = match.roommate;

          return {
            id: roommate._id,
            name: roommate.name || 'Roomie',
            age: roommate.age || '?', 
            university: roommate.university || 'University Student',
            hall: roommate.hall || 'Residency',
            bio: roommate.bio || 'Looking for a great roommate!',
            compatibility: Math.round(match.compatibilityScore || 70),
            whatsapp: roommate.whatsapp || '',
            avatar:
              roommate.avatar ||
              `https://api.dicebear.com/9.x/avataaars/svg?seed=${roommate.name || roommate._id}&backgroundColor=ffdfbf`,
          };
        });

        setProfiles(formattedProfiles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Could not load profiles. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopMatches();
  }, []);

  const currentProfile = profiles[currentIndex] || null;

  const handleLike = () => {
    if (!currentProfile) return;
    // Note: You can add an API call here to POST a "like" to the backend if desired
    console.log(`Liked ${currentProfile.name} (ID: ${currentProfile.id})`);
    nextProfile();
  };

  const handleReject = () => {
    if (!currentProfile) return;
    console.log(`Rejected ${currentProfile.name} (ID: ${currentProfile.id})`);
    nextProfile();
  };

  const nextProfile = () => {
    setSwipeDirection(null);
    setCurrentIndex((prev) => prev + 1);
  };

  // Swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setTimeout(handleReject, 300);
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
      setTimeout(handleLike, 300);
    },
    trackMouse: true,
    delta: 80,
    preventScrollOnSwipe: true,
    swipeDuration: 300,
  });

  if (loading) {
    return (
      <div className="discovery-page">
        <div className="no-more">
          <h2>Loading awesome roomies...</h2>
          <p>Finding your perfect match ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discovery-page empty-state">
        <div className="no-more">
          <h2>{error}</h2>
          <button
            className="back-to-matches"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= profiles.length || !currentProfile) {
    return (
      <div className="discovery-page empty-state">
        <div className="no-more">
          <h2>No more profiles right now... 🥺💤</h2>
          <p>Check back later or view your matched list!</p>
          <button className="back-to-matches" onClick={() => navigate('/matches')}>
            See My Matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="discovery-page" {...handlers}>
      <h1 className="page-title">Discover Roomies</h1>
      <p className="subtitle">Swipe right to match • Swipe left to pass ♡</p>

      <div className={`card-container ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}>
        <div className="profile-card">
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="profile-avatar"
          />

          <div className="profile-info">
            <h2 className="profile-name">
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <p className="profile-university">{currentProfile.university} • {currentProfile.hall}</p>
            <div className="compatibility-badge">
              {currentProfile.compatibility}% Match
            </div>
            <p className="profile-bio">{currentProfile.bio}</p>
          </div>

          {/* WhatsApp quick chat button */}
          {currentProfile.whatsapp && (
            <button
              className="whatsapp-btn"
              onClick={(e) => {
                e.stopPropagation();
                const msg = `Hey ${currentProfile.name}! I liked your profile on RoomieRadar~ 🏠✨ Let's talk?`;
                window.open(
                  `https://wa.me/${currentProfile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`,
                  '_blank'
                );
              }}
            >
              💬 Message on WhatsApp
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="swipe-actions">
        <button className="swipe-btn reject" onClick={handleReject}>
          ✕
        </button>
        <button className="swipe-btn accept" onClick={handleLike}>
          ♥
        </button>
      </div>

      <button className="back-to-list" onClick={() => navigate('/matches')}>
        ← Back to List View
      </button>
    </div>
  );
};

export default Discovery;