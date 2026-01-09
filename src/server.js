// backend/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // optional for logging

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const compatibilityRoutes = require('./routes/compatibilityRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Import middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // optional: logs HTTP requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => res.send('RoomieRadar Backend is running!'));
app.use('/api/users', userRoutes);
app.use('/api/compatibility', compatibilityRoutes);
app.use('/api/matches', matchRoutes);

// Middleware for 404 and error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
