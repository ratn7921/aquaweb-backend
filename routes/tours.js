// routes/tours.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/tours', async (req, res) => {
  try {
    const response = await axios.get('https://triposo-api.p.rapidapi.com/api/v2/poi.json', {
      params: {
        tag_labels: 'cruise,boat_trip,whale_watching',
        location_id: 'goa',
        account: 'TRIPOSO',
        token: 'YOUR_TRIPOSO_API_TOKEN'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'triposo-api.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Tours fetch error:', err.message);
    res.status(500).json({ error: 'Tours fetch failed' });
  }
});

module.exports = router;
