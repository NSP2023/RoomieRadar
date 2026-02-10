// src/pages/RoommateMatch/DaySimulation.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DaySimulation.css';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust if your backend port/host is different

const DaySimulation = () => {
  const { id } = useParams(); // roommate's user ID
  const navigate = useNavigate();

  const [simulationData, setSimulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
          setError('Please log in to view this simulation');
          setLoading(false);
          return;
        }

        // Fetch simulation (protected route)
        const simRes = await axios.get(
          `${API_BASE_URL}/matches/simulation/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { simulation, compatibilityScore } = simRes.data;

        // Fetch roommate basic info (name, avatar, etc.)
        const roommateRes = await axios.get(`${API_BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const roommate = roommateRes.data;

        // Format data for UI (same structure as before)
        const formattedData = {
          name: roommate.name || 'Roomie',
          avatar:
            roommate.avatar ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${roommate.name || id}&backgroundColor=fed7aa`,
          compatibility: Math.round(compatibilityScore || 0),
          dayActivities: simulation?.length > 0
            ? simulation.map((item) => ({
                time: item.time || '—',
                activity: item.activity || 'Activity',
                description: item.potentialConflict
                  ? `Potential conflict level: ${item.potentialConflict}`
                  : 'No conflict info',
                compatibility: item.potentialConflict
                  ? `${item.potentialConflict} match`
                  : 'Neutral',
              }))
            : [
                {
                  time: '—',
                  activity: 'No simulation data',
                  description: 'No daily simulation available for this match yet',
                  compatibility: '',
                },
              ],
        };

        setSimulationData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching simulation:', err);

        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
        } else if (err.response?.status === 404) {
          setError('Simulation not found for this match.');
        } else {
          setError('Could not load the day simulation. Please try again later.');
        }

        setLoading(false);
      }
    };

    fetchSimulation();
  }, [id]);

  if (loading) {
    return (
      <div className="simulation-page">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/matches')}>
            ← Back to Matches
          </button>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Loading your day simulation...</h2>
            <p>Preparing a cozy preview ♡</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !simulationData) {
    return (
      <div className="simulation-page">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/matches')}>
            ← Back to Matches
          </button>
          <div
            style={{
              textAlign: 'center',
              marginTop: '4rem',
              color: '#e74c3c',
            }}
          >
            <h2>{error || 'Failed to load simulation'}</h2>
            <button
              className="back-btn"
              onClick={() => window.location.reload()}
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
    <div className="simulation-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/matches')}>
          ← Back to Matches
        </button>

        <h1 className="page-title">One Day with {simulationData.name}</h1>
        <p className="subtitle">
          Compatibility: <strong>{simulationData.compatibility}%</strong> ♡
        </p>

        <div className="avatar-header">
          <img
            src={simulationData.avatar}
            alt={`${simulationData.name}'s avatar`}
            className="simulation-avatar"
          />
          <h2 className="roomie-name">{simulationData.name}</h2>
        </div>

        <div className="timeline">
          {simulationData.dayActivities.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="time-bubble">{item.time}</div>

              <div className="activity-card">
                <div className="activity-emoji">{item.activity}</div>
                <div className="activity-description">{item.description}</div>
                {item.compatibility && (
                  <div className="compat-note">
                    <span className="note-label">With you:</span> {item.compatibility}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <h3>Quick Summary ♡</h3>
          <p>
            This is a preview of a typical day living with {simulationData.name}.
            {simulationData.dayActivities.some(
              (a) =>
                a.compatibility?.toLowerCase().includes('high') ||
                a.compatibility?.toLowerCase().includes('good')
            )
              ? ' Looks like you have quite a few harmonious moments!'
              : ' There are a few areas where small adjustments might help.'}
          </p>
          <p className="tip">
            Tip: Communicate about quiet hours and shared responsibilities — it makes everything smoother! ☕✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default DaySimulation;