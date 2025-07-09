//not part of main Application 


const express = require('express');
const router = express.Router();
const { getWormsSpecies } = require('../controllers/wormsController');

// Route: GET /api/worms/:name
router.get('/:name', getWormsSpecies);

module.exports = router;
