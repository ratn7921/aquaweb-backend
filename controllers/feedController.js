//attention needed
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Media = require('../models/Media');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Sighting = require('../models/Sighting');
const Incident = require('../models/Incident');
const Trip = require('../models/Trip');

// ✅ Create a Post
const createPost = async (req, res) => {
  try {
    const { caption, type, refId } = req.body;
    const userId = req.user?._id;

    let media = [];

    if (req.files && req.files.length > 0) {
      const mediaDocs = await Promise.all(req.files.map(async (file) => {
        const m = await Media.create({
          user: userId,
          url: file.filename,
          type: file.mimetype.startsWith('video') ? 'video' : 'image',
        });
        return m._id;
      }));
      media = mediaDocs;
    } else if (req.body.media && Array.isArray(req.body.media)) {
      media = req.body.media
        .filter(id => mongoose.Types.ObjectId.isValid(id))
        .map(id => new mongoose.Types.ObjectId(id));
    }

    const post = await Post.create({
      author: userId,
      caption,
      type,
      refId: type === 'custom' ? undefined : refId,
      media,
    });

    await post.populate('author', 'name avatar');
    res.status(201).json(post);
  } catch (err) {
    console.error('createPost error:', err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

// ✅ Get Feed
const getFeed = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [sights, incs, trips] = await Promise.all([
      Sighting.find().lean(),
      Incident.find().lean(),
      Trip.find().lean(),
    ]);

    const legacy = [
      ...sights.map(s => ({ ...s, type: 'sighting' })),
      ...incs.map(i => ({ ...i, type: 'incident' })),
      ...trips.map(t => ({ ...t, type: 'trip' })),
    ];

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip).limit(limit)
      .populate('author', 'name avatar')
      .lean();

    const merged = [...legacy, ...posts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);

    const feed = await Promise.all(merged.map(async item => {
      const id = item._id;
      const [likesCount, commentsCount, iLiked] = await Promise.all([
        Like.countDocuments({ post: id }),
        Comment.countDocuments({ post: id }),
        Like.exists({ post: id, user: req.user._id }),
      ]);
      return { ...item, likesCount, commentsCount, iLiked };
    }));

    res.json({ page, limit, feed });
  } catch (err) {
    console.error('getFeed error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name avatar')
      .lean();

    if (!post) return res.status(404).json({ message: 'Not found' });

    const [likesCount, commentsCount, iLiked] = await Promise.all([
      Like.countDocuments({ post: post._id }),
      Comment.countDocuments({ post: post._id }),
      Like.exists({ post: post._id, user: req.user._id }),
    ]);

    res.json({ ...post, likesCount, commentsCount, iLiked });
  } catch (err) {
    console.error('getPostById error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getFeed,
  getPostById,
};





