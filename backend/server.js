// backend/src/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//const morgan = require('morgan'); // optional logging

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
//app.use(morgan('dev')); // logs requests to console


// =======================
// Routes
// =======================
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/compatibility', require('./routes/compatibilityRoutes'));
app.use('/api/users', require('./routes/userRoutes')); 
// Health check
app.get('/', (req, res) => res.send('RoomieRadar Mock Backend is running!'));



// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Mock server running on port ${PORT}`));
