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
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/news/:newsId', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({
      newsId: req.params.newsId,
      authorId: req.user.id,
      text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
