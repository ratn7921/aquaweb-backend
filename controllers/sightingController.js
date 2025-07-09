
// -------------- controllers/sightingController.js --------------
const Sighting = require('../models/Sighting');
const Species = require('../models/Species');
const Activity = require('../models/Activity');

exports.reportSighting = async (req, res) => {
  try {
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

    const postEntry = {
      reporter: reporterName,
      count: req.body.count,
      behavior: req.body.behavior,
      location: sighting.location,
      photoUrl: sighting.photoUrl,
      createdAt: sighting.createdAt,
    };

    let speciesDoc = await Species.findOne({ name: req.body.species });

    if (speciesDoc) {
      if (!speciesDoc.posts) speciesDoc.posts = [];
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