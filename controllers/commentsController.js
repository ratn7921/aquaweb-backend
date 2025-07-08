


const Comment = require('../models/Comment');

exports.list = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) return res.status(400).json({ message: 'Post ID is required' });

    const comments = await Comment.find({ post: postId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error('commentsController.list error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user._id;

    if (!text || !postId) {
      return res.status(400).json({ message: 'Missing text or post ID' });
    }

    const comment = await Comment.create({ text, post: postId, user: userId });
    await comment.populate('user', 'name avatar');

    res.status(201).json(comment);
  } catch (err) {
    console.error('commentsController.create error:', err);
    res.status(500).json({ message: err.message });
  }
};
