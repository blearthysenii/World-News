const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Marr të gjitha komentet për një lajm
router.get('/news/:newsId', async (req, res) => {
  try {
    const comments = await Comment.find({ newsId: req.params.newsId })
      .populate('authorId', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error('Error in GET /comments/news/:newsId:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST një koment të ri për një lajm
router.post('/news/:newsId', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    const comment = new Comment({
      newsId: req.params.newsId,
      authorId: req.user.id,
      text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error in POST /comments/news/:newsId:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
