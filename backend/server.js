// backend/src/server.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // optional logging

// =======================
// Initialize Express App
// =======================
const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // logs requests to console

// =======================
// Mock Data
// =======================
let users = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    lifestyle: { sleep: 'Early', cleanliness: 'High', noiseTolerance: 'Low' },
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    lifestyle: { sleep: 'Late', cleanliness: 'Medium', noiseTolerance: 'High' },
  },
];

let matches = [
  {
    userId: '1',
    roommate: 'Bob',
    compatibilityScore: 78,
    badges: ['Good Match'],
    tips: ['Adjust sleep schedule slightly'],
    simulation: [
      { hour: 8, activity: 'Wake up' },
      { hour: 9, activity: 'Breakfast' },
      { hour: 14, activity: 'Study' },
      { hour: 22, activity: 'Sleep' },
    ],
  },
];

// =======================
// Routes
// =======================

// Health check
app.get('/', (req, res) => res.send('RoomieRadar Mock Backend is running!'));

// Signup
app.post('/api/users/signup', (req, res) => {
  const { name, email } = req.body;
  const id = (users.length + 1).toString();
  const newUser = { id, name, email, lifestyle: {} };
  users.push(newUser);
  res.status(201).json({ user: newUser, token: 'mock-token' });
});

// Login
app.post('/api/users/login', (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid email' });
  res.json({ user, token: 'mock-token' });
});

// Get profile
app.get('/api/users/profile/:userId', (req, res) => {
  const user = users.find((u) => u.id === req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Compatibility calculate
app.post('/api/compatibility/calculate', (req, res) => {
  res.json(matches); // Return mock matches
});

// Get top matches
app.get('/api/matches/:userId/top', (req, res) => {
  const userMatches = matches.filter((m) => m.userId === req.params.userId);
  res.json(userMatches);
});

// Get one-day simulation for a roommate
app.get('/api/matches/:userId/simulation/:roommateId', (req, res) => {
  const match = matches.find(
    (m) => m.userId === req.params.userId && m.roommate === req.params.roommateId
  );
  if (!match) return res.status(404).json({ message: 'Simulation not found' });
  res.json(match.simulation);
});

// Compare two roommates
app.post('/api/matches/:userId/compare', (req, res) => {
  const { roommate1Id, roommate2Id } = req.body;
  const match1 = matches.find(
    (m) => m.userId === req.params.userId && m.roommate === roommate1Id
  );
  const match2 = matches.find(
    (m) => m.userId === req.params.userId && m.roommate === roommate2Id
  );
  res.json({ match1, match2 });
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Mock server running on port ${PORT}`));
