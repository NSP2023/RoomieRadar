// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ChartWrapper from '../../components/ChartWrapper';
import { questionnaireQuestions } from '../../data/questionnaireQuestions';
import './Dashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust if your backend port is different

const Dashboard = () => {
  const [answers, setAnswers] = useState({});
  const [originalAnswers, setOriginalAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  const [visibleQuestions, setVisibleQuestions] = useState(0);

  const questions = questionnaireQuestions;

  // Staggered reveal of questions (unchanged)
  useEffect(() => {
    if (visibleQuestions < questions.length) {
      const timer = setTimeout(() => {
        setVisibleQuestions((prev) => prev + 1);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [visibleQuestions]);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        const lifestyle = userData.lifestyle || {};

        // Map backend categorical answers to numeric scores (0–10)
        const mappedAnswers = {
          cleanliness:
            lifestyle.cleanliness === 'High' ? 9 :
            lifestyle.cleanliness === 'Low' ? 3 : 6,
          sleep:
            lifestyle.sleep === 'Early' ? 3 :
            lifestyle.sleep === 'Late' ? 8 : 5,
          noise:
            lifestyle.noiseTolerance === 'High' ? 9 :
            lifestyle.noiseTolerance === 'Low' ? 3 : 6,
          // Add real values later when you expand categories in backend
          guests: 5,
          sharing: 5,
          conflict: 5,
          petsAttitude: 5,
          petsResponsibility: 5,
        };

        setAnswers(mappedAnswers);
        setOriginalAnswers(mappedAnswers);
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

  // Handle answer selection (unchanged)
  const handleAnswer = (field, score) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: score,
    }));
    setSaveMessage(null);
  };

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(answers) !== JSON.stringify(originalAnswers);

  // Save changes to backend
  const handleSaveChanges = async () => {
    if (!hasChanges) return;

    try {
      setSaving(true);
      setSaveMessage(null);
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Session expired. Please log in again.');
        return;
      }

      // Map frontend numeric scores back to backend enum values
      const lifestyleUpdate = {
        cleanliness:
          answers.cleanliness >= 8 ? 'High' :
          answers.cleanliness <= 4 ? 'Low' : 'Medium',
        sleep:
          answers.sleep <= 4 ? 'Early' :
          answers.sleep >= 7 ? 'Late' : 'Flexible',
        noiseTolerance:
          answers.noise >= 8 ? 'High' :
          answers.noise <= 4 ? 'Low' : 'Medium',
        // Add more mappings here when you expand categories
      };

      const response = await axios.put(
        `${API_BASE_URL}/users/profile`,
        { lifestyle: lifestyleUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSaveMessage('Preferences saved successfully! Radar updated.');
        setOriginalAnswers({ ...answers });
      }
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError(
        err.response?.data?.message ||
        'Failed to save changes. Please try again.'
      );
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  // Mock best match for radar (replace later with real top match)
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
          Discover your roommate personality & cozy pet compatibility
        </p>

        {/* Radar Chart */}
        <div className="card radar-card">
          <h2 className="card-title">Compatibility Radar ✧</h2>
          <div className="radar-container">
            <ChartWrapper
              type="radar"
              data={radarData}
              options={radarOptions}
              height="520px"
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="card">
          <h2 className="card-title">Your Answers & Preferences</h2>
          <p className="subtitle" style={{ marginBottom: '2rem', fontSize: '1.22rem' }}>
            Review or change your answers — radar updates instantly!
          </p>

          <div className="questions-grid">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`question-item ${index < visibleQuestions ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 160}ms` }}
              >
                <h3 className="question-text">{q.question}</h3>

                <div className="options">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[q.field] === opt.score;
                    return (
                      <button
                        key={idx}
                        className={`option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleAnswer(q.field, opt.score)}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                <div className="score-display">
                  Your vibe: <strong>{answers[q.field] ?? '?'}</strong> / 10
                </div>
              </div>
            ))}
          </div>

          {/* Save Changes Button + Message */}
          <div className="save-section">
            <button
              className={`save-btn ${hasChanges ? 'active' : 'disabled'}`}
              onClick={handleSaveChanges}
              disabled={!hasChanges || saving}
            >
              {saving
                ? 'Saving...'
                : hasChanges
                ? 'Save Changes'
                : 'No changes to save'}
            </button>

            {saveMessage && (
              <p className="save-message fade-in">{saveMessage}</p>
            )}
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