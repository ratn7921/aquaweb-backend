// // server/controllers/commentsController.js
// import Comment from '../models/Comment.js';

// export const list = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     if (!postId) return res.status(400).json({ message: 'Post ID is required' });

//     const comments = await Comment.find({ post: postId })
//       .populate('user', 'name avatar')
//       .sort({ createdAt: -1 });

//     res.json(comments);
//   } catch (err) {
//     console.error('Error fetching comments:', err);
//     res.status(500).json({ message: 'Failed to fetch comments' });
//   }
// };

// export const create = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { text } = req.body;
//     const userId = req.user?._id;

//     if (!postId || !text || !userId) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newComment = await Comment.create({
//       post: postId,
//       user: userId,
//       text,
//     });

//     const populatedComment = await newComment.populate('user', 'name avatar');

//     res.status(201).json(populatedComment);
//   } catch (err) {
//     console.error('Error creating comment:', err);
//     res.status(500).json({ message: 'Failed to create comment' });
//   }
// };


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
