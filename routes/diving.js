//not part of main Application 

// routes/diving.js
const express = require('express');
const router = express.Router();

router.get('/diving-spots', (req, res) => {
  res.json([
    { name: 'Andaman Diving', location: 'Havelock Island', price: '₹3500' },
    { name: 'Goa Dive Center', location: 'Grande Island', price: '₹3000' }
  ]);
});

module.exports = router;
