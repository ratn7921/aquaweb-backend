// routes/speciesRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSpecies } = require('../controllers/speciesController');

router.get('/', getAllSpecies);

module.exports = router;