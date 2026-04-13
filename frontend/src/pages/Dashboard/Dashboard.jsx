// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ChartWrapper from '../../components/ChartWrapper';
import { questionnaireQuestions } from '../../data/questionnaireQuestions';
import './Dashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const questions = questionnaireQuestions;

  // Fetch real user lifestyle answers from backend
  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your dashboard');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user || {};
        const lifestyle = userData.lifestyle || {};

        const mappedAnswers = {
          cleanliness:
            lifestyle.cleanliness === 'High' ? 9 :
            lifestyle.cleanliness === 'Low'  ? 3 : 6,
          sleep:
            lifestyle.sleep === 'Early' ? 3 :
            lifestyle.sleep === 'Late'  ? 8 : 5,
          noise:
            lifestyle.noiseTolerance === 'High' ? 9 :
            lifestyle.noiseTolerance === 'Low'  ? 3 : 6,
          guests:   lifestyle.guests   ? (lifestyle.guests   === 'Often' ? 9 : lifestyle.guests   === 'Sometimes' ? 5 : 2) : 5,
          sharing:  lifestyle.sharing  ? (lifestyle.sharing  === 'Shared' ? 9 : lifestyle.sharing === 'Flexible'  ? 5 : 2) : 5,
          conflict: lifestyle.conflict ? (lifestyle.conflict === 'Immediate' ? 9 : lifestyle.conflict === 'Calm'   ? 5 : 2) : 5,
          petsAttitude:      lifestyle.pets ? (lifestyle.pets === 'Yes' ? 9 : lifestyle.pets === 'Flexible' ? 6 : lifestyle.pets === 'Maybe' ? 4 : 2) : 5,
          petsResponsibility: 5,
        };

        setAnswers(mappedAnswers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user preferences:', err);
        setError(
          err.response?.data?.message ||
          'Failed to load your preferences. Please log in again.'
        );
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, []);

  // Mock best match for radar
  const bestMatch = {
    cleanliness: 8,
    sleep: 7,
    noise: 6,
    guests: 5,
    sharing: 7,
    conflict: 8,
    petsAttitude: 7,
    petsResponsibility: 7,
  };

  const radarData = {
    labels: questions.map((q) => q.field.replace(/([A-Z])/g, ' $1').trim()),
    datasets: [
      {
        label: 'Your Vibe',
        data: Object.values(answers),
        backgroundColor: 'rgba(255, 123, 140, 0.22)',
        borderColor: 'rgba(255, 123, 140, 0.9)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff7b8c',
        pointHoverBackgroundColor: '#ff7b8c',
        pointHoverBorderColor: '#fff',
      },
      {
        label: 'Dream Roomie',
        data: Object.values(bestMatch),
        backgroundColor: 'rgba(167, 230, 215, 0.24)',
        borderColor: 'rgba(167, 230, 215, 0.9)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#a7e6d7',
        pointHoverBackgroundColor: '#a7e6d7',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(166,111,92,0.25)' },
        grid: { color: 'rgba(166,111,92,0.18)' },
        pointLabels: {
          font: { size: 14, weight: 600, family: 'Nunito' },
          color: '#a66f5c',
        },
        ticks: {
          stepSize: 2,
          color: '#8a7580',
          backdropColor: 'transparent',
        },
        min: 0,
        max: 10,
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Loading your RoomieRadar...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#e74c3c' }}>
            <h2>{error}</h2>
            <button
              className="save-btn active"
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
    <div className="dashboard-page">
      <div className="container">
        <h1 className="page-title">RoomieRadar Dashboard</h1>
        <p className="subtitle">
          Discover your roommate personality &amp; cozy pet compatibility
        </p>

        {/* Radar Chart */}
        <div className="card radar-card">
          <h2 className="card-title">Compatibility Radar</h2>
          <h2 style={{ color: 'gray', paddingLeft: '32%' }}>
            How much of a good roommate am I?
          </h2>
          <br />
          <div className="radar-container">
            <ChartWrapper
              type="radar"
              data={radarData}
              options={radarOptions}
              height="520px"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="decor-bear-1" />
      <div className="decor-bear-2" />
    </div>
  );
};

export default Dashboard;
