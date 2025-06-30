// //old controllers/speciesController.js
// const Species = require('../models/Species');
// exports.getAllSpecies = async (req, res) => {
//   try {
//     const { filter } = req.query;
//     let query = {};
//     if (filter) {
//       // Case-insensitive partial match on name field
//       query.name = { $regex: filter, $options: 'i' };
//     }

//     const species = await Species.find(query);
//     res.json(species);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




//unwanted code
// const Species = require('../models/Species');
// const axios = require('axios');

// const WORMS_API_URL = process.env.WORMS_API_URL || 'https://www.marinespecies.org/rest';

// exports.getAllSpecies = async (req, res) => {
//   try {
//     const filter = req.query.filter;
//     const query = filter ? { name: new RegExp(filter, 'i') } : {};
//     const species = await Species.find(query);
//     res.json(species);
//   } catch (err) {
//     console.error('Failed to fetch species from DB:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.getFromWorms = async (req, res) => {
//   const name = req.params.name;
//   if (!name) return res.status(400).json({ message: 'Species name required' });

//   try {
//     const response = await axios.get(`${WORMS_API_URL}/AphiaRecordsByName/${encodeURIComponent(name)}?like=true&marine_only=true`, {
//       headers: { Accept: 'application/json' },
//       timeout: 5000
//     });

//     // 🛡️ Defensive check
//     if (!response.data || !Array.isArray(response.data)) {
//       return res.status(502).json({ message: 'Invalid or empty response from WoRMS API' });
//     }

//     const wormsData = response.data.map(item => ({
//       name: item.valid_name || item.scientificname,
//       scientificName: item.scientificname,
//       authority: item.authority,
//       rank: item.rank,
//       habitat: item.habitat,
//       image: item.image,
//       facts: item.facts,
//       _source: 'WoRMS'
//     }));

//     res.json(wormsData);
//   } catch (err) {
//     console.error('Error fetching from WoRMS API:', err.message);
//     res.status(500).json({ message: 'Failed to fetch from WoRMS API' });
//   }
// };

const Species = require('../models/Species');
const axios = require('axios');

const WORMS_API_URL = process.env.WORMS_API_URL;
const OBIS_API_URL = process.env.OBIS_API_URL;
const NAS_API_URL = process.env.NAS_API_URL;

async function tryApi(url, parser) {
  try {
    console.log(`🔍 Trying: ${url}`);
    const response = await axios.get(url, {
      timeout: 5000,
      headers: { Accept: 'application/json' },
      validateStatus: () => true
    });

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn(`⚠️ Empty or invalid data from ${url}`);
      return null;
    }

    return parser(response.data);
  } catch (err) {
    console.error(`❌ API error from ${url}:`, err.message);
    return null;
  }
}

exports.getAllSpecies = async (req, res) => {
  try {
    const { filter } = req.query;
    const query = filter ? { name: new RegExp(filter, 'i') } : {};
    const species = await Species.find(query);
    res.json(species);
  } catch (err) {
    console.error('Failed to fetch species from DB:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFromWorms = async (req, res) => {
  const name = req.params.name;
  if (!name) return res.status(400).json({ message: 'Species name required' });

  const encoded = encodeURIComponent(name);

  const sources = [
    {
      url: `${WORMS_API_URL}/AphiaRecordsByName/${encoded}?like=true&marine_only=true`,
      parser: data => data.map(item => ({
        name: item.valid_name || item.scientificname,
        scientificName: item.scientificname,
        authority: item.authority,
        rank: item.rank,
        habitat: item.habitat,
        image: item.image,
        facts: item.facts,
        _source: 'WoRMS'
      }))
    },
    {
      url: `${OBIS_API_URL}/species?scientificname=${encoded}`,
      parser: data => data.results?.map(item => ({
        name: item.scientificName,
        scientificName: item.scientificName,
        authority: item.authority,
        rank: item.rank,
        habitat: item.environment,
        _source: 'OBIS'
      })) || []
    },
    {
      url: `${NAS_API_URL}/species/search?query=${encoded}`,
      parser: data => data.results?.map(item => ({
        name: item.commonName,
        scientificName: item.scientificName,
        description: item.description,
        _source: 'NAS'
      })) || []
    }
  ];

  for (const source of sources) {
    const result = await tryApi(source.url, source.parser);
    if (result && result.length > 0) {
      return res.json(result);
    }
  }

  return res.status(502).json({ message: 'All external species APIs failed or returned no data.' });
};
