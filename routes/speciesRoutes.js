
// // routes/speciesRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getAllSpecies , getFromWorms } = require('../controllers/speciesController');

// router.get('/', getAllSpecies);
// router.get('/worms/:name', getFromWorms); // localhost:5000/api/species/worms/shark

// module.exports = router;




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
