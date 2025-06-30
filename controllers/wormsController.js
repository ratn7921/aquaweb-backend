// controllers/wormsController.js
const fetch = require('node-fetch');

exports.getSpeciesFromWormsOrFallback = async (req, res) => {
  const speciesName = req.params.name;

  try {
    const wormsRes = await fetch(`https://www.marinespecies.org/rest/AphiaRecordsByName/${speciesName}?like=true`);
    const wormsData = await wormsRes.json();

    if (Array.isArray(wormsData) && wormsData.length > 0) {
      return res.json(wormsData);
    }

    // If WoRMS gives no data, fallback to FishWatch
    const fishRes = await fetch('https://www.fishwatch.gov/api/species');
    const fishText = await fishRes.text();

    let fishData;
    try {
      fishData = JSON.parse(fishText);
    } catch {
      console.error('❌ FishWatch JSON parse failed');
      return res.status(500).json({ message: 'Fallback failed: FishWatch returned invalid data' });
    }

    const filtered = fishData.filter(item =>
      item['Species Name']?.toLowerCase().includes(speciesName.toLowerCase())
    );

    return res.json(filtered);

  } catch (err) {
    console.error('❌ Failed to fetch species:', err.message);
    res.status(500).json({ message: 'Something went wrong while fetching species data' });
  }
};
