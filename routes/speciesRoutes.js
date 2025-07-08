



const express = require('express');
const router = express.Router();

const {
  getAllSpecies,
  getFromWorms,
  getSpeciesByName,
} = require('../controllers/speciesController');

// GET /api/species?filter=Dolphin
router.get('/', getAllSpecies);

// Legacy: GET /api/species/worms/:name
router.get('/worms/:name', getFromWorms);

// ✅ Preferred: GET /api/species/by-name?name=Dolphin
router.get('/by-name', getSpeciesByName);

module.exports = router;
