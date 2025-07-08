


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
      validateStatus: () => true,
    });

    const parsed = parser(response.data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch (err) {
    console.error(`❌ API error from ${url}:`, err.message);
    return null;
  }
}

// ✅ Local DB only with optional filter
const getAllSpecies = async (req, res) => {
  try {
    const { filter } = req.query;
    const query = filter ? { name: new RegExp(filter, 'i') } : {};
    const species = await Species.find(query);
    res.json(species);
  } catch (err) {
    console.error('❌ Failed to fetch species:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Legacy WoRMS only (optional)
const getFromWorms = async (req, res) => {
  const name = req.params.name;
  if (!name) return res.status(400).json({ message: 'Species name required' });

  const encoded = encodeURIComponent(name);
  const url = `${WORMS_API_URL}/AphiaRecordsByName/${encoded}?like=true&marine_only=true`;

  const parser = (data) =>
    data.map((item) => ({
      name: item.valid_name || item.scientificname,
      scientificName: item.scientificname,
      authority: item.authority,
      rank: item.rank,
      habitat: item.habitat,
      image: item.image,
      facts: item.facts,
      _source: 'WoRMS',
    }));

  const result = await tryApi(url, parser);
  if (result) return res.json(result);

  return res.status(502).json({ message: 'No data from WoRMS' });
};

// ✅ Combined local + external
const getSpeciesByName = async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ message: 'Species name is required.' });

  const encoded = encodeURIComponent(name);
  const localQuery = { name: new RegExp(name, 'i') };
  let local = [];

  try {
    local = await Species.find(localQuery);
  } catch (err) {
    console.error('❌ Local DB fetch error:', err.message);
  }

  const sources = [
    {
      url: `${WORMS_API_URL}/AphiaRecordsByName/${encoded}?like=true&marine_only=true`,
      parser: (data) =>
        data.map((item) => ({
          name: item.valid_name || item.scientificname,
          scientificName: item.scientificname,
          authority: item.authority,
          rank: item.rank,
          habitat: item.habitat,
          image: item.image,
          facts: item.facts,
          _source: 'WoRMS',
        })),
    },
    {
      url: `${OBIS_API_URL}/species?scientificname=${encoded}`,
      parser: (data) =>
        data.results?.map((item) => ({
          name: item.scientificName,
          scientificName: item.scientificName,
          authority: item.authority,
          rank: item.rank,
          habitat: item.environment,
          _source: 'OBIS',
        })) || [],
    },
    {
      url: `${NAS_API_URL}/species/search?query=${encoded}`,
      parser: (data) =>
        data.results?.map((item) => ({
          name: item.commonName,
          scientificName: item.scientificName,
          description: item.description,
          _source: 'NAS',
        })) || [],
    },
  ];

  let external = [];
  for (const source of sources) {
    const result = await tryApi(source.url, source.parser);
    if (result) {
      external = result;
      break;
    }
  }

  res.json({ local, external });
};

module.exports = {
  getAllSpecies,
  getFromWorms,
  getSpeciesByName,
};
