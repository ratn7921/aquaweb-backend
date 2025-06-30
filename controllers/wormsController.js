

// const axios = require('axios');

// exports.getWormsSpecies = async (req, res) => {
//   const speciesName = req.params.name;
//   console.log(`🔍 Looking up species: ${speciesName}`);

//   try {
//     // Step 1: Fetch from WoRMS
//     const wormsRes = await axios.get(
//       `https://www.marinespecies.org/rest/AphiaRecordsByName/${encodeURIComponent(speciesName)}?like=true`
//     );

//     const wormsData = wormsRes.data;

//     if (Array.isArray(wormsData) && wormsData.length > 0) {
//       const formatted = wormsData.map(item => ({
//         name: item.valid_name || item.scientificname || speciesName,
//         scientificName: item.scientificname,
//         authority: item.authority,
//         rank: item.rank,
//         habitat: item.environment,
//         source: 'WoRMS',
//       }));
//       return res.json(formatted);
//     }

//     // Step 2: Fallback to FishWatch API
//     console.log(`⚠️ WoRMS had no results for ${speciesName}. Trying FishWatch...`);
//     const fishRes = await axios.get('https://www.marinespecies.org/rest/AphiaAttributeKeysByID/0?include_children=true', {
//       headers: { Accept: 'application/json' }
//     });

//     let fishData = fishRes.data;

//     if (typeof fishData === 'string') {
//       try {
//         fishData = JSON.parse(fishData);
//       } catch (err) {
//         console.error('❌ FishWatch data is not valid JSON.');
//         return res.status(500).json({ message: 'Failed to parse FishWatch response.' });
//       }
//     }

//     if (!Array.isArray(fishData)) {
//       return res.status(500).json({ message: 'Unexpected FishWatch response format.' });
//     }

//     const filtered = fishData.filter(item =>
//       item['Species Name']?.toLowerCase().includes(speciesName.toLowerCase())
//     );

//     const fallbackFormatted = filtered.map(item => ({
//       name: item['Species Name'],
//       scientificName: item['Scientific Name'],
//       authority: item['Authority'],
//       habitat: item['Habitat'],
//       source: 'FishWatch',
//     }));

//     return res.json(fallbackFormatted);
//   } catch (err) {
//     console.error('🔥 Total fetch failure:', err.message);
//     return res.status(500).json({ message: 'Failed to fetch species data', error: err.message });
//   }
// };



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
