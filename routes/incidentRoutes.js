const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Incident = require('../models/Incident');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET /api/incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch incidents.' });
  }
});

// POST /api/incidents
router.post(
  '/',
  upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'shipImage', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { type, description, lat, lng, shipName, shipNumber } = req.body;
      if (!type || !description || !lat || !lng) {
        return res.status(400).json({ message: 'All fields except photo are required.' });
      }

      const photoUrl = req.files?.photo?.[0]?.filename ? `/uploads/${req.files.photo[0].filename}` : '';
      const shipImageUrl = req.files?.shipImage?.[0]?.filename ? `/uploads/${req.files.shipImage[0].filename}` : '';

      const incident = await Incident.create({
        type,
        description,
        photoUrl,
        location: { lat: Number(lat), lng: Number(lng) },
        shipName: shipName || '',
        shipNumber: shipNumber || '',
        shipImageUrl
      });

      res.status(201).json(incident);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to report incident.' });
    }
  }
);

// Repost route
router.post('/:id/repost', async (req, res) => {
  try {
    const orig = await Incident.findById(req.params.id);
    if (!orig) return res.status(404).json({ message: 'Incident not found' });

    const userId = req.user?._id || null;
    const newIncident = await Incident.create({
      type: orig.type,
      description: orig.description,
      photoUrl: orig.photoUrl,
      location: orig.location,
      reporter: userId,
      createdAt: new Date(),
      shipName: orig.shipName,
      shipNumber: orig.shipNumber,
      shipImageUrl: orig.shipImageUrl,
      isRepost: true,
      originalIncident: orig._id,
    });

    res.status(201).json(newIncident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional test route
router.get('/test', (req, res) => res.send('Incident route is working!'));

module.exports = router;
