



// // server/app.js
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const createError = require('http-errors');
// const cors = require('cors');
// const errorHandler = require('./middleware/errorHandler');
// const flightRoutes = require('./routes/flights');
// const flightsRoute = require('./routes/flights');
// const toursRoute = require('./routes/tours');
// const divingRoute = require('./routes/diving');
// // const triposoRoutes = require('./routes/triposo');
// // const opentripmapRoutes = require('./routes/opentripmap');
// // const amadeusRoutes = require('./routes/amadeus');

// const app = express();

// // CORS setup
// const allowedOrigins = ['http://localhost:5173']; // Update this for prod if needed
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));
// app.options('*', cors({
//   origin: allowedOrigins[0],
//   credentials: true
// }));

// // Middleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Ensure credentials header
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/sightings', require('./routes/sightingRoutes'));
// app.use('/api/trips', require('./routes/tripRoutes'));
// app.use('/api/incidents', require('./routes/incidentRoutes'));
// app.use('/api/species', require('./routes/speciesRoutes'));
// app.use('/api/feed', require('./routes/feedRoutes'));
// app.use('/api/worms', require('./routes/wormsRoutes'));
// app.use('/api/test', require('./routes/uploadRoutes')); // Legacy route
// app.use('/api/role-requests', require('./routes/roleRequestRoutes'));
// app.use('/api/media', require('./routes/mediaRoutes'));         // ✅ New
// app.use('/api/comments', require('./routes/commentsRoutes'));   // ✅ New
// app.use('/api/likes', require('./routes/likesRoutes'));         // ✅ New
// app.use('/api/analytics', require('./routes/analyticsRoutes')); // ✅ New
// app.use('/api/offline', require('./routes/offlineRoutes'));     // ✅ New
// app.use('/api/flights', flightRoutes);
// app.use('/api/triposo', triposoRoutes);
// app.use('/api/opentripmap', opentripmapRoutes);
// app.use('/api/amadeus', amadeusRoutes);


// app.use('/api/flights', flightsRoute);
// app.use('/api/tours', toursRoute);
// app.use('/api/diving', divingRoute);

// // Root route
// app.get('/', (req, res) => {
//   res.send('🌊 AquaWeb API is running!');
// });

// // 404
// app.use((req, res, next) => {
//   next(createError(404, 'Route not found'));
// });

// // Global error handler
// app.use(errorHandler);

// module.exports = app;




// server/app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const flightsRoute = require('./routes/flights');
const toursRoute = require('./routes/tours');
const divingRoute = require('./routes/diving');

const app = express();

// CORS setup
const allowedOrigins = ['http://localhost:5173']; // Update this for production
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.options('*', cors({
  origin: allowedOrigins[0],
  credentials: true
}));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure credentials header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sightings', require('./routes/sightingRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/species', require('./routes/speciesRoutes'));
app.use('/api/feed', require('./routes/feedRoutes'));
app.use('/api/worms', require('./routes/wormsRoutes'));
app.use('/api/test', require('./routes/uploadRoutes')); // Legacy route
app.use('/api/role-requests', require('./routes/roleRequestRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/comments', require('./routes/commentsRoutes'));
app.use('/api/likes', require('./routes/likesRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/offline', require('./routes/offlineRoutes'));

app.use('/api/flights', flightsRoute);
app.use('/api/tours', toursRoute);
app.use('/api/diving', divingRoute);

// Root route
app.get('/', (req, res) => {
  res.send('🌊 AquaWeb API is running!');
});

// 404 Not Found
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
