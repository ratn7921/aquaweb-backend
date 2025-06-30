

// const express = require('express');
// const router = express.Router();
// const fetch = require('node-fetch');

// const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Iconic_image_not_found.svg/240px-Iconic_image_not_found.svg.png';

// // Safe JSON parser to avoid crashing on bad API responses
// const safeJson = async (res) => {
//   try {
//     return await res.json();
//   } catch {
//     return null;
//   }
// };

// // GET /api/worms/:name
// router.get('/:name', async (req, res) => {
//   const name = encodeURIComponent(req.params.name);
//   const base = 'https://www.marinespecies.org/rest';

//   try {
//     const recordsRes = await fetch(`${base}/AphiaRecordsByName/${name}?like=true`);
//     if (!recordsRes.ok) throw new Error(`WoRMS status ${recordsRes.status}`);
//     const records = await safeJson(recordsRes);
//     if (!Array.isArray(records) || records.length === 0) throw new Error('No species found in WoRMS');

//     const detailed = await Promise.all(
//       records.slice(0, 5).map(async (item) => {
//         try {
//           const fullRes = await fetch(`${base}/AphiaRecordByID/${item.AphiaID}`);
//           if (!fullRes.ok) throw new Error('Detail fetch failed');
//           const full = await safeJson(fullRes);
//           if (!full) throw new Error('Empty or malformed response');
//           return {
//             name: full.scientificname || item.scientificname || 'Unknown',
//             image: full.image || DEFAULT_IMAGE,
//             authority: full.authority || 'N/A',
//             rank: full.rank || 'N/A',
//             habitat: full.environment || 'N/A',
//             source: 'WoRMS'
//           };
//         } catch (innerErr) {
//           console.warn('Failed record fetch:', innerErr.message);
//           return null;
//         }
//       })
//     );

//     const filtered = detailed.filter(Boolean);
//     if (filtered.length === 0) throw new Error('All detail fetches failed');

//     return res.json(filtered);
//   } catch (err) {
//     console.warn('Fallback triggered:', err.message);

//     // 🐟 FishWatch fallback
//     try {
//       const fwRes = await fetch('https://www.fishwatch.gov/api/species');
//       if (!fwRes.ok) throw new Error(`FishWatch status ${fwRes.status}`);
//       const fwData = await safeJson(fwRes);
//       if (!fwData) throw new Error('FishWatch gave invalid JSON');

//       const matches = fwData.filter(item =>
//         item['Species Name'] &&
//         item['Species Name'].toLowerCase().includes(req.params.name.toLowerCase())
//       );

//       if (!matches.length) throw new Error('No match from FishWatch');

//       const fallback = matches.slice(0, 5).map(fw => ({
//         name: fw['Species Name'],
//         image: fw['Species Illustration Photo']?.src || DEFAULT_IMAGE,
//         authority: fw['Scientific Name'] || 'N/A',
//         rank: 'N/A',
//         habitat: fw['Habitat'] || 'N/A',
//         source: 'FishWatch'
//       }));

//       return res.json(fallback);
//     } catch (fallbackErr) {
//       console.error('Fallback failed:', fallbackErr.message);
//       return res.status(500).json({
//         message: 'Failed to fetch from WoRMS and FishWatch',
//         error: `${err.message} | ${fallbackErr.message}`
//       });
//     }
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getSpeciesFromWormsOrFallback } = require('../controllers/wormsController');

router.get('/:name', getSpeciesFromWormsOrFallback);

module.exports = router;
