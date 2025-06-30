// // old controllers/sightingController.js
// // const Sighting = require('../models/Sighting');

// // exports.createSighting = async (req, res) => {
// //   try {
// //     // Debug: log incoming data
// //     console.log('BODY:', req.body);
// //     console.log('FILE:', req.file);

// //     const { species, count, behavior, lat, lng } = req.body;
// //     if (!species || !count || !lat || !lng) {
// //       return res.status(400).json({ message: 'Required fields missing.' });
// //     }
// //     let photoUrl = '';
// //     if (req.file) {
// //       photoUrl = '/uploads/' + req.file.filename;
// //     }
// //     const sighting = await Sighting.create({
// //       species,
// //       count,
// //       behavior,
// //       photoUrl,
// //       location: { lat: Number(lat), lng: Number(lng) },
// //       // reporter: req.user?._id // Uncomment if you use authentication
// //       reporter: req.user._id

// //     });
// //     res.status(201).json(sighting);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // exports.getAllSightings = async (req, res) => {
// //   try {
// //     const sightings = await Sighting.find().populate('reporter', 'name');
// //     res.json(sightings);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // controllers/sightingController.js
// const Sighting = require('../models/Sighting');
// const Activity = require('../models/Activity');

// exports.createSighting = async (req, res) => {
//   try {
//     console.log('BODY:', req.body);
//     console.log('FILE:', req.file);

//     const { species, count, behavior, lat, lng } = req.body;
//     if (!species || !count || !lat || !lng) {
//       return res.status(400).json({ message: 'Required fields missing.' });
//     }

//     let photoUrl = '';
//     if (req.file) {
//       photoUrl = '/uploads/' + req.file.filename;
//     }

//     const sighting = await Sighting.create({
//       species,
//       count,
//       behavior,
//       photoUrl,
//       location: { lat: Number(lat), lng: Number(lng) },
//       reporter: req.user._id
//     });

//  await Activity.create({
//   user: req.user._id,
//   type: 'sighting',
//   species: req.body.species,
//   photoUrl: req.body.photoUrl,
//   timestamp: new Date()
// });

//     res.status(201).json(sighting);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getAllSightings = async (req, res) => {
//   try {
//     const sightings = await Sighting.find().populate('reporter', 'name');
//     res.json(sightings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.reportSighting = async (req, res) => {
//   try {
//     const sightingData = {
//       species: req.body.species,
//       count: req.body.count,
//       behavior: req.body.behavior,
//       location: req.body.location,
//       reporter: req.user._id,
//     };

//     if (req.file && req.file.path) {
//       const cleanPath = '/' + req.file.path.replace(/\\/g, '/').split('uploads')[1];
//       sightingData.photoUrl = '/uploads' + cleanPath;
//     }

//     const savedSighting = await Sighting.create(sightingData);

//     // ✅ Paste the activity logging right after saving the sighting
//     await Activity.create({
//       user: req.user._id,
//       type: 'sighting',
//       data: {
//         species: savedSighting.species,
//         count: savedSighting.count,
//         behavior: savedSighting.behavior,
//         photoUrl: savedSighting.photoUrl,
//         location: savedSighting.location,
//       },
//       timestamp: savedSighting.createdAt,
//     });

//     res.status(201).json(savedSighting);
//   } catch (err) {
//     console.error('Error reporting sighting:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



//




const Sighting = require('../models/Sighting');
const Species = require('../models/Species');
const Activity = require('../models/Activity');

exports.reportSighting = async (req, res) => {
  try {
    console.log('✅ Incoming BODY:', req.body);
    console.log('✅ FILE:', req.file);

    // 🛠️ Handle flat field names like 'location[lat]' and 'location[lng]'
    // const lat = parseFloat(req.body['location[lat]']);
    // const lng = parseFloat(req.body['location[lng]']);

    // if (!req.body.species || !req.body.count || isNaN(lat) || isNaN(lng)) {
    //   return res.status(400).json({ message: 'Missing or invalid required fields.' });
    // }

    const rawLat = req.body['location[lat]'] || req.body.location?.lat;
const rawLng = req.body['location[lng]'] || req.body.location?.lng;

const lat = parseFloat(String(rawLat).trim().replace(/[^0-9.-]/g, ''));
const lng = parseFloat(String(rawLng).trim().replace(/[^0-9.-]/g, ''));

if (!req.body.species || !req.body.count || isNaN(lat) || isNaN(lng)) {
  return res.status(400).json({ message: 'Missing or invalid required fields.' });
}


    const photoUrl = req.file ? '/uploads/' + req.file.filename : '';
    const reporterId = req.user?._id;
    const reporterName = req.user?.name || 'Anonymous';

    const sighting = await Sighting.create({
      species: req.body.species,
      count: req.body.count,
      behavior: req.body.behavior,
      photoUrl,
      location: { lat, lng },
      reporter: reporterId,
    });

    // 🧾 Log activity
    await Activity.create({
      user: reporterId,
      type: 'sighting',
      data: {
        species: sighting.species,
        count: sighting.count,
        behavior: sighting.behavior,
        photoUrl: sighting.photoUrl,
        location: sighting.location,
      },
      timestamp: sighting.createdAt,
    });

    // 🧬 Update species document
    const speciesDoc = await Species.findOne({ name: req.body.species });
    const postEntry = {
      reporter: reporterName,
      count: req.body.count,
      behavior: req.body.behavior,
      location: sighting.location,
      photoUrl: sighting.photoUrl,
      createdAt: sighting.createdAt,
    };

    if (speciesDoc) {
      speciesDoc.posts.push(postEntry);
      await speciesDoc.save();
    } else {
      await Species.create({
        name: req.body.species,
        imageUrl: photoUrl,
        addedBy: 'User Report',
        posts: [postEntry],
      });
    }

    res.status(201).json(sighting);
  } catch (err) {
    console.error('❌ Error in reportSighting:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllSightings = async (req, res) => {
  try {
    const sightings = await Sighting.find().populate('reporter', 'name email');
    res.status(200).json(sightings);
  } catch (err) {
    console.error('❌ Error fetching sightings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
