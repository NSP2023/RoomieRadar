// backend/src/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config();

//const morgan = require('morgan'); // optional logging
require('./src/config/passport'); 
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
const authRoutes = require('./src/routes/authRoutes');
//const userRoutes = require('./src/routes/userRoutes');
const compatibilityRoutes = require('./src/routes/compatibilityRoutes');
const matchRoutes = require('./src/routes/matchRoutes');

app.use('/api/users', authRoutes);
//app.use('/api/users', userRoutes);
app.use('/api/compatibility', compatibilityRoutes);
app.use('/api/matches', matchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'RoomieRadar API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});



// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Mock server running on port ${PORT}`));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));
