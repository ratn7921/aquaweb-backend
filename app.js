// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS setup for frontend access
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve frontend build files in production
// Ensure credentials header is always included
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sightings', require('./routes/sightingRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/species', require('./routes/speciesRoutes'));
app.use('/api/feed', require('./routes/feedRoutes'));
app.use('/api/worms', require('./routes/wormsRoutes'));

// Root test route
app.get('/', (req, res) => {
  res.send('🌊 AquaWeb API is running!');
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
