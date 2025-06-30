const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting');
const Incident = require('../models/Incident');
const Trip = require('../models/Trip');

// GET /api/feed - public feed
router.get('/', async (req, res) => {
  try {
    const [sightings, incidents, trips] = await Promise.all([
      Sighting.find().lean(),
      Incident.find().lean(),
      Trip.find().lean(),
    ]);
    const posts = [
      ...sightings.map(s => ({ ...s, type: 'sighting' })),
      ...incidents.map(i => ({ ...i, type: 'incident' })),
      ...trips.map(t => ({ ...t, type: 'trip' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts);
  } catch (err) {
    console.error('Feed route error:', err); // <--- Add this line
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;