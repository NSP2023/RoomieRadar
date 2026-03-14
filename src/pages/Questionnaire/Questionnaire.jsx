// src/pages/Questionnaire/Questionnaire.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Questionnaire.css';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust if your backend port/host is different

// Full list of questions (unchanged)
const questions = [
  {
    id: 1,
    question: "🧹 How clean do you like your shared spaces to be?",
    field: "cleanliness",
    options: [
      { text: "✨ I need everything super tidy!", value: 10 },
      { text: "Moderately clean is perfect", value: 7 },
      { text: "A little mess is cozy", value: 4 },
      { text: "Chaos is my comfort zone 😅", value: 2 },
    ],
  },
  {
    id: 2,
    question: "💤 What's your ideal sleep schedule?",
    field: "sleep",
    options: [
      { text: "Early bird ~ 10pm to 6am", value: 10 },
      { text: "Pretty flexible!", value: 7 },
      { text: "Night owl ~ midnight or later", value: 4 },
      { text: "Sleep? What's that? 😴", value: 2 },
    ],
  },
  {
    id: 3,
    question: "🎧 How much noise can you handle while relaxing/studying?",
    field: "noise",
    options: [
      { text: "I need almost complete silence", value: 10 },
      { text: "Some background noise is okay", value: 7 },
      { text: "Noise doesn't really bother me", value: 4 },
      { text: "I love lively & noisy vibes!", value: 2 },
    ],
  },
  {
    id: 4,
    question: "👥 How often do you have friends over?",
    field: "guests",
    options: [
      { text: "Almost every week — my place is the hangout spot!", value: 9 },
      { text: "A few times a month is perfect", value: 6 },
      { text: "Rarely — maybe once every 1–2 months", value: 3 },
      { text: "Almost never — I like my space private", value: 1 },
    ],
  },
  {
    id: 5,
    question: "🍕 Sharing food & stuff — your vibe?",
    field: "sharing",
    options: [
      { text: "What's mine is yours! Community fridge energy ♡", value: 9 },
      { text: "We can share sometimes, but let's talk first", value: 6 },
      { text: "I prefer keeping my things separate", value: 3 },
      { text: "My food is my food. No sharing, please.", value: 1 },
    ],
  },
  {
    id: 6,
    question: "💬 When there's a disagreement, how do you handle it?",
    field: "conflict",
    options: [
      { text: "I talk about it right away — clear the air fast!", value: 9 },
      { text: "I wait a bit, then bring it up calmly", value: 6 },
      { text: "I avoid conflict if possible... maybe drop hints", value: 3 },
      { text: "I just keep it inside until I explode or leave", value: 1 },
    ],
  },
  {
    id: 7,
    question: "🐶 How do you feel about living with pets?",
    field: "petsAttitude",
    options: [
      { text: "I LOVE pets! The more the merrier ♡", value: 9 },
      { text: "I'm okay with pets if they're well-behaved", value: 6 },
      { text: "I'm neutral — I don't mind but also don't need them", value: 4 },
      { text: "I'd rather live without pets (allergies / preference)", value: 2 },
    ],
  },
  {
    id: 8,
    question: "🐾 If there's a pet in the house, how do you feel about helping out?",
    field: "petsResponsibility",
    options: [
      { text: "I'm happy to walk/feed/clean after them — team player!", value: 9 },
      { text: "I can help sometimes, but prefer the owner does most", value: 6 },
      { text: "I'll do the bare minimum if I have to", value: 3 },
      { text: "Pet care is 100% the owner's responsibility — not mine", value: 1 },
    ],
  },
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const progress = ((current + 1) / questions.length) * 100;

  const handleOptionSelect = (value) => {
    const field = questions[current].field;
    setAnswers((prev) => ({ ...prev, [field]: value }));

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      // Finish → save to backend
      saveAnswersToBackend();
    }
  };

  const saveAnswersToBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to save your answers');
        setLoading(false);
        return;
      }

      // Map frontend numeric scores (1-10) → backend enum values
      const lifestyleData = {
        cleanliness:
          answers.cleanliness >= 8 ? 'High' :
          answers.cleanliness >= 5 ? 'Medium' : 'Low',

        sleep:
          answers.sleep >= 8 ? 'Early' :
          answers.sleep >= 5 ? 'Flexible' : 'Late',

        noiseTolerance:
          answers.noise >= 8 ? 'High' :
          answers.noise >= 5 ? 'Medium' : 'Low',

        // Add more mappings when you add these fields to User model
        // guests: answers.guests >= 7 ? 'Often' : answers.guests >= 4 ? 'Sometimes' : 'Rarely',
        // sharing: answers.sharing >= 7 ? 'Shared' : answers.sharing >= 4 ? 'Flexible' : 'Private',
        // conflict: answers.conflict >= 8 ? 'Immediate' : answers.conflict >= 5 ? 'Calm' : 'Avoidant',
        // pets: answers.petsAttitude >= 7 ? 'Yes' : answers.petsAttitude >= 4 ? 'Maybe' : 'No',
        // petsResponsibility: answers.petsResponsibility >= 7 ? 'TeamPlayer' : answers.petsResponsibility >= 4 ? 'Sometimes' : 'OwnerOnly',
      };

      // Send to backend
      const response = await axios.put(
        `${API_BASE_URL}/users/profile`,
        { lifestyle: lifestyleData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setShowResults(true);
      } else {
        setError('Failed to save answers. Please try again.');
      }
    } catch (err) {
      console.error('Error saving answers:', err);
      setError(
        err.response?.data?.message ||
        'Something went wrong while saving. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateCompatibilityScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxPossible = questions.length * 10;
    return Math.round((total / maxPossible) * 100);
  };

  const restartQuestionnaire = () => {
    setCurrent(0);
    setAnswers({});
    setShowResults(false);
    setError(null);
  };

  if (showResults) {
    const score = calculateCompatibilityScore();

    return (
      <div className="kawaii-questionnaire">
        <div className="container results-container">
          <div className="header">
            <h1 className="title">Yayy! You're done! 🎉</h1>
            <p className="subtitle">Here's your cozy compatibility vibe~</p>
          </div>

          <div className="score-circle">{score}%</div>

          <div className="button-group">
            <button className="option-btn" onClick={restartQuestionnaire}>
              Let's do it again!
            </button>

            <button className="option-btn" onClick={() => navigate('/matches')}>
              Show me my roomie matches!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="kawaii-questionnaire">
      <div className="container">
        <div className="header">
          <h1 className="title">RoomieRadar</h1>
          <p className="subtitle">Let's find your perfect roommate match~ ♡</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleOptionSelect(option.value)}
                disabled={loading}
              >
                {option.text}
              </button>
            ))}
          </div>

          {error && (
            <p style={{ color: '#e74c3c', marginTop: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}

          {loading && (
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Saving your answers... ♡
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;