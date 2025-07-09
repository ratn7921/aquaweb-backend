//not part of main Application 

// routes/amadeus.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/flight-destinations', async (req, res) => {
  const { origin, oneWay, maxPrice } = req.query;

  try {
    const response = await axios.get('https://amadeus-flight-booking.p.rapidapi.com/flights', {
      params: {
        origin: origin || 'NYC',
        oneWay: oneWay || 'false',
        maxPrice: maxPrice || '500'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'amadeus-flight-booking.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Amadeus API error:', err.message);
    res.status(500).json({ error: 'Amadeus API failed' });
  }
});

module.exports = router;
