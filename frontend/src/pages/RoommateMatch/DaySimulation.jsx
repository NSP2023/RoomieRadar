// src/pages/RoommateMatch/DaySimulation.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DaySimulation.css';

const API_BASE_URL = 'http://localhost:5000/api';

const VIBE_CONFIG = {
  smooth:  { label: '✨ Smooth',     className: 'vibe-smooth',  bar: 100 },
  minor:   { label: '🌤 Minor bump', className: 'vibe-minor',   bar: 55  },
  tension: { label: '⚡ Tension',    className: 'vibe-tension', bar: 20  },
};

const OVERALL_MESSAGES = {
  great:  { emoji: '💖', text: 'You two would make an amazing pair! The day flows naturally and you bring out the best in each other.' },
  decent: { emoji: '🌸', text: 'Overall a pretty comfortable day! A few small adjustments and you\'d be living in harmony.' },
  mixed:  { emoji: '🌤', text: 'Some moments click, some need work. Open communication will go a long way with this match.' },
  rocky:  { emoji: '⚡', text: 'There are real differences here — but that doesn\'t mean it can\'t work! It just means you\'d need to set clear boundaries early.' },
};

// Which tip categories belong to which timeline event (by activity title keyword)
const EVENT_TIP_MAP = {
  'Morning Wake-Up':   ['sleep'],
  'Breakfast':         ['cleanliness', 'sharing'],
  'Study / Work Time': ['noise'],
  'Lunch Break':       ['cleanliness'],
  'Afternoon Session': ['noise'],
  'Evening & Guests':  ['guests'],
  'Dinner Time':       ['sharing', 'cleanliness'],
  'Relax & Unwind':    ['conflict'],
  'Pet Moment 🐾':     ['pets'],
  'Lights Out':        ['sleep'],
};

const TIP_LEVEL_STYLE = {
  High:       { bg: '#fff0f0', border: '#ef9a9a', dot: '#e53935' },
  'Very High':{ bg: '#fff0f0', border: '#ef9a9a', dot: '#e53935' },
  Medium:     { bg: '#fffdf0', border: '#ffe082', dot: '#f9a825' },
  Low:        { bg: '#f0fff4', border: '#a5d6a7', dot: '#43a047' },
};

const DaySimulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [simulationData, setSimulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) { setError('Please log in to view this simulation'); setLoading(false); return; }

        const [simRes, roommateRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/matches/simulation/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const { simulation, compatibilityScore, tips } = simRes.data;
        const roommate = roommateRes.data;

        // Build a lookup: category → tip object
        const tipsByCategory = {};
        (tips || []).forEach(t => { tipsByCategory[t.category] = t; });

        setSimulationData({
          name: roommate.name || 'Roomie',
          avatar:
            roommate.avatar ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${roommate.name || id}&backgroundColor=fed7aa`,
          compatibility: Math.round(compatibilityScore || 0),
          events: simulation || [],
          overallVibe: simulation?.[0]?.overallVibe || 'decent',
          tipsByCategory,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 401 ? 'Session expired. Please log in again.' :
          err.response?.status === 404 ? 'Simulation not found for this match.' :
          'Could not load the day simulation. Please try again later.'
        );
        setLoading(false);
      }
    };
    fetchSimulation();
  }, [id]);

  // Staggered reveal
  useEffect(() => {
    if (!simulationData) return;
    if (visibleCount < simulationData.events.length) {
      const t = setTimeout(() => setVisibleCount((p) => p + 1), 200);
      return () => clearTimeout(t);
    }
  }, [simulationData, visibleCount]);

  if (loading) return (
    <div className="simulation-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/matches')}>← Back to Matches</button>
        <div className="sim-loading">
          <div className="loading-bear">🧸</div>
          <h2>Simulating your day together...</h2>
          <p>Brewing up a cozy preview  !</p>
        </div>
      </div>
    </div>
  );

  if (error || !simulationData) return (
    <div className="simulation-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/matches')}>← Back to Matches</button>
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#e74c3c' }}>
          <h2>{error || 'Failed to load simulation'}</h2>
          <button className="back-btn" onClick={() => window.location.reload()} style={{ marginTop: '1.5rem' }}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  const overall = OVERALL_MESSAGES[simulationData.overallVibe] || OVERALL_MESSAGES.decent;
  const smoothCount  = simulationData.events.filter(e => e.potentialConflict === 'smooth').length;
  const minorCount   = simulationData.events.filter(e => e.potentialConflict === 'minor').length;
  const tensionCount = simulationData.events.filter(e => e.potentialConflict === 'tension').length;

  return (
    <div className="simulation-page">
      <div className="container">

        <button className="back-btn" onClick={() => navigate('/matches')}>
          ← Back to Matches
        </button>

        {/* Header */}
        <div className="sim-header">
          <img src={simulationData.avatar} alt={simulationData.name} className="simulation-avatar" />
          <h1 className="page-title">A Day with {simulationData.name}</h1>
          <div className="compat-badge">{simulationData.compatibility}% Compatible</div>
          <p className="subtitle">Here's how a typical day might look if you two lived together ♡</p>
        </div>

        {/* Vibe scoreboard */}
        <div className="vibe-scoreboard">
          <div className="vibe-stat vibe-smooth">
            <span className="vibe-count">{smoothCount}</span>
            <span className="vibe-stat-label">Smooth moments</span>
          </div>
          <div className="vibe-stat vibe-minor">
            <span className="vibe-count">{minorCount}</span>
            <span className="vibe-stat-label">Minor bumps</span>
          </div>
          <div className="vibe-stat vibe-tension">
            <span className="vibe-count">{tensionCount}</span>
            <span className="vibe-stat-label">Tension points</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {simulationData.events.map((event, index) => {
            const vibe = VIBE_CONFIG[event.potentialConflict] || VIBE_CONFIG.minor;
            const isVisible = index < visibleCount;

            // Find tips that belong to this event
            const relatedCategories = EVENT_TIP_MAP[event.activity] || [];
            const relatedTips = relatedCategories
              .map(cat => simulationData.tipsByCategory[cat])
              .filter(Boolean);

            return (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="time-bubble">{event.time}</div>

                <div className={`activity-card ${vibe.className}`}>
                  {/* Top row */}
                  <div className="card-top">
                    <span className="activity-emoji">{event.emoji}</span>
                    <span className="activity-title">{event.activity}</span>
                    <span className={`vibe-tag ${vibe.className}`}>{vibe.label}</span>
                  </div>

                  {/* Story text */}
                  <p className="activity-text">{event.text}</p>

                  {/* Harmony bar */}
                  <div className="harmony-bar-wrap">
                    <span className="harmony-label">Harmony</span>
                    <div className="harmony-bar-bg">
                      <div
                        className={`harmony-bar-fill ${vibe.className}`}
                        style={{ width: `${vibe.bar}%` }}
                      />
                    </div>
                    <span className="harmony-pct">{vibe.bar}%</span>
                  </div>

                  {/* ✅ Inline tips — only shown if there are relevant tips */}
                  {relatedTips.length > 0 && (
                    <div className="inline-tips">
                      {relatedTips.map((tip, ti) => {
                        const style = TIP_LEVEL_STYLE[tip.level] || TIP_LEVEL_STYLE.Medium;
                        return (
                          <div
                            key={ti}
                            className="inline-tip"
                            style={{ background: style.bg, borderColor: style.border }}
                          >
                            <div className="inline-tip-top">
                              <span className="inline-tip-dot" style={{ background: style.dot }} />
                              <span className="inline-tip-emoji">{tip.emoji}</span>
                              <span className="inline-tip-label">
                                {tip.level === 'Low' ? 'Compatible ✓' :
                                 tip.level === 'Medium' ? 'Worth discussing' :
                                 'Heads up!'}
                              </span>
                            </div>
                            <p className="inline-tip-text">{tip.tip}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="summary-box">
          <div className="summary-emoji">{overall.emoji}</div>
          <h3>Day Summary</h3>
          <p className="summary-text">{overall.text}</p>
          <div className="summary-stats">
            <div className="stat-pill smooth">{smoothCount} smooth</div>
            <div className="stat-pill minor">{minorCount} bumps</div>
            <div className="stat-pill tension">{tensionCount} tensions</div>
          </div>
          <p className="tip">
            💡 Tip: Even the best roomie pairs need a quick chat about habits.
            Try agreeing on quiet hours, kitchen rules, and guest policies in week one — it saves a hundred awkward moments later! ☕
          </p>
        </div>

      </div>
    </div>
  );
};

export default DaySimulation;