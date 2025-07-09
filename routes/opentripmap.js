// routes/opentripmap.js
//Attension Needed
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/places/radius', async (req, res) => {
  const { radius, lon, lat, kinds, apikey } = req.query;

  try {
    const response = await axios.get(`https://opentripmap-places-v1.p.rapidapi.com/en/places/radius`, {
      params: {
        radius,
        lon,
        lat,
        kinds,
        rate: 2,
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('OpenTripMap API error:', err.message);
    res.status(500).json({ error: 'OpenTripMap API failed' });
  }
});

module.exports = router;
