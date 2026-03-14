// src/pages/Discovery/Discovery.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import './Discovery.css';

const API_BASE_URL = 'http://localhost:5000/api'; // ← change if your backend is on different port/host

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

        // Get current user ID from token or profile (here we assume /profile gives it)
        const userRes = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = userRes.data._id || userRes.data.id;

        const matchesRes = await axios.get(
          `${API_BASE_URL}/matches/${userId}/top`,
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
            age: roommate.age || '?', // ← add age field to User model if needed
            university: roommate.university || 'Unknown Uni', // ← add if you have this field
            bio: roommate.bio || 'Looking for a great roommate!',
            compatibility: Math.round(match.compatibilityScore || 70),
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
    // In real app: send like / interest to backend
    console.log(`Liked ${currentProfile.name} (ID: ${currentProfile.id}) → potential match!`);
    nextProfile();
  };

  const handleReject = () => {
    if (!currentProfile) return;
    console.log(`Rejected ${currentProfile.name} (ID: ${currentProfile.id})`);
    nextProfile();
  };

  const nextProfile = () => {
    setSwipeDirection(null);
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length));
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
          <p>Just a moment ✨</p>
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
          <p>Check back later or see who you've already matched with!</p>
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
            <p className="profile-university">{currentProfile.university}</p>
            <div className="compatibility-badge">
              {currentProfile.compatibility}% Match
            </div>
            <p className="profile-bio">{currentProfile.bio}</p>
          </div>

          {/* WhatsApp quick chat button */}
          <button
            className="whatsapp-btn"
            onClick={() => {
              const msg = `Hey ${currentProfile.name}! I liked your profile on RoomieRadar~ 🏠✨ Let's talk about being roommates?`;
              window.open(
                `https://wa.me/88017xxxxxxxx?text=${encodeURIComponent(msg)}`,
                '_blank'
              );
            }}
          >
            💬 Message on WhatsApp
          </button>
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