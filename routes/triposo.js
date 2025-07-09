// routes/triposo.js
//not part of main Application 

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/poi', async (req, res) => {
  const { tag_labels, location_id, account, token } = req.query;

  try {
    const response = await axios.get('https://triposo-api.p.rapidapi.com/api/v2/poi.json', {
      params: {
        tag_labels,
        location_id,
        account,
        token
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'triposo-api.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Triposo API error:', err.message);
    res.status(500).json({ error: 'Triposo API failed' });
  }
});

module.exports = router;
