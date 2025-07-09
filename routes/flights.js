//not part of main Application 

// routes/flights.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const response = await axios.get('https://skyscanner44.p.rapidapi.com/search', {
      params: {
        adults: '1',
        origin: origin || 'DEL',
        destination: destination || 'BOM',
        departureDate: date || '2025-07-10',
        currency: 'INR'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Flight search error:', err.message);
    res.status(500).json({ error: 'Flight search failed' });
  }
});

module.exports = router;
