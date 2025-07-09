



// ------------------------- server/app.js -------------------------
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.options('*', cors({ origin: allowedOrigins[0], credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sightings', require('./routes/sightingRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/species', require('./routes/speciesRoutes'));
app.use('/api/feed', require('./routes/feedRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/comments', require('./routes/commentsRoutes'));
app.use('/api/likes', require('./routes/likesRoutes'));
app.use('/api/role-requests', require('./routes/roleRequestRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/offline', require('./routes/offlineRoutes'));
app.use('/api/worms', require('./routes/wormsRoutes'));
app.use('/api/test', require('./routes/uploadRoutes'));
app.use('/api/test', require('./routes/testRoutes'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/diving', require('./routes/diving'));

app.get('/', (req, res) => {
  res.send('🌊 AquaWeb API is running!');
});

app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});
app.use(errorHandler);

module.exports = app;