// // routes/speciesRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getAllSpecies } = require('../controllers/speciesController');

// router.get('/', getAllSpecies);

// module.exports = router;



// routes/speciesRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSpecies , getFromWorms } = require('../controllers/speciesController');

router.get('/', getAllSpecies);
router.get('/worms/:name', getFromWorms); // localhost:5000/api/species/worms/shark

module.exports = router;
