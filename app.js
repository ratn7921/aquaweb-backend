// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors'); // <-- Add this at the top

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sightingRoutes = require('./routes/sightingRoutes');
const tripRoutes = require('./routes/tripRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const speciesRoutes = require('./routes/speciesRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors()); // <-- Add this before your routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sightings', sightingRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/species', speciesRoutes);

app.get('/', (req, res) => {
  res.send('AquaWeb API is running');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;