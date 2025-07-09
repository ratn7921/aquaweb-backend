//not part of main Application 

const axios = require('axios');

exports.getWormsSpecies = async (req, res) => {
  const speciesName = req.params.name;
  console.log(`🔍 Looking up species: ${speciesName}`);

  try {
    const wormsRes = await axios.get(
      `https://www.marinespecies.org/rest/AphiaRecordsByName/${encodeURIComponent(speciesName)}?like=true`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    if (typeof wormsRes.data !== 'object') {
      console.warn('⚠️ WoRMS response is not JSON');
      return res.status(502).json({ message: 'Invalid WoRMS response', html: wormsRes.data });
    }

    const wormsData = wormsRes.data;

    if (Array.isArray(wormsData) && wormsData.length > 0) {
      const formatted = wormsData.map(item => ({
        name: item.valid_name || item.scientificname || speciesName,
        scientificName: item.scientificname,
        authority: item.authority,
        rank: item.rank,
        habitat: item.environment,
        source: 'WoRMS',
        image: null
      }));
      return res.json(formatted);
    }

    return res.status(404).json({ message: 'No data found for species' });

  } catch (err) {
    console.error('🔥 WoRMS error:', err.message);
    return res.status(500).json({ message: 'Error fetching species data', error: err.message });
  }
};
