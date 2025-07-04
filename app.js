
// // server/app.js
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const createError = require('http-errors');
// const cors = require('cors');

// const errorHandler = require('./middleware/errorHandler');

// const flightsRoute = require('./routes/flights');
// const toursRoute = require('./routes/tours');
// const divingRoute = require('./routes/diving');

// const app = express();

// // CORS setup
// const allowedOrigins = ['http://localhost:5173']; // Update this for production
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

// // API Routes
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
// app.use('/api/media', require('./routes/mediaRoutes'));
// app.use('/api/comments', require('./routes/commentsRoutes'));
// app.use('/api/likes', require('./routes/likesRoutes'));
// app.use('/api/analytics', require('./routes/analyticsRoutes'));
// app.use('/api/offline', require('./routes/offlineRoutes'));

// app.use('/api/flights', flightsRoute);
// app.use('/api/tours', toursRoute);
// app.use('/api/diving', divingRoute);

// // Root route
// app.get('/', (req, res) => {
//   res.send('🌊 AquaWeb API is running!');
// });

// // 404 Not Found
// app.use((req, res, next) => {
//   next(createError(404, 'Route not found'));
// });

// // Global error handler
// app.use(errorHandler);

// module.exports = app;





const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// ✅ CORS Configuration
const allowedOrigins = ['http://localhost:5173']; // <- Update for prod
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.options('*', cors({ origin: allowedOrigins[0], credentials: true }));

// ✅ Core Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Static & Media Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Set CORS credentials header manually (just in case)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ✅ API ROUTES — Social + Core + Legacy
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sightings', require('./routes/sightingRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/species', require('./routes/speciesRoutes'));

app.use('/api/feed', require('./routes/feedRoutes'));           // ✅ New social feed
app.use('/api/media', require('./routes/mediaRoutes'));         // ✅ Media upload
app.use('/api/comments', require('./routes/commentsRoutes'));   // ✅ Comments
app.use('/api/likes', require('./routes/likesRoutes'));         // ✅ Likes
app.use('/api/role-requests', require('./routes/roleRequestRoutes')); // ✅ Role upgrade

app.use('/api/analytics', require('./routes/analyticsRoutes')); // ✅ Stats & heatmaps
app.use('/api/offline', require('./routes/offlineRoutes'));     // ✅ Offline sync queue

app.use('/api/worms', require('./routes/wormsRoutes'));         // Legacy taxonomies
app.use('/api/test', require('./routes/uploadRoutes'));         // Test uploads
app.use('/api/test', require('./routes/testRoutes'));

// ✅ Demo APIs
app.use('/api/flights', require('./routes/flights'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/diving', require('./routes/diving'));

// ✅ Root Health Check
app.get('/', (req, res) => {
  res.send('🌊 AquaWeb API is running!');
});

// ✅ 404 & Error Handling
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});
app.use(errorHandler);

module.exports = app;
